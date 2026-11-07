import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from '@environments/environment';
import { firstValueFrom } from 'rxjs';
import { AdminAuthService } from './admin-auth.service';
import { PostedArtworksService } from './posted-artworks.service';

describe('PostedArtworksService — where a painting can be seen', () => {
  const ENDPOINT = `${environment.backendUrl}posts/instagram/58`;

  const serviceOn = (platform: 'browser' | 'server') => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PLATFORM_ID, useValue: platform },
        { provide: AdminAuthService, useValue: { bearerToken: () => null, isAdmin: () => false } },
      ],
    });
    return {
      service: TestBed.inject(PostedArtworksService),
      http: TestBed.inject(HttpTestingController),
    };
  };

  afterEach(() => TestBed.resetTestingModule());

  it('answers with the post when the api has one', async () => {
    const { service, http } = serviceOn('browser');

    const asking = firstValueFrom(service.getInstagramPermalink('58'));
    http
      .expectOne(ENDPOINT)
      .flush({ success: true, data: { permalink: 'https://www.instagram.com/p/abc/' } });

    expect(await asking).toBe('https://www.instagram.com/p/abc/');
    http.verify();
  });

  it('answers with nothing when the painting has not been posted', async () => {
    const { service, http } = serviceOn('browser');

    const asking = firstValueFrom(service.getInstagramPermalink('58'));
    http.expectOne(ENDPOINT).flush({ success: true, data: { permalink: null } });

    expect(await asking).toBeNull();
    http.verify();
  });

  /**
   * The one that matters. A post is somebody else's to delete, so a built page
   * must not carry a link promising one is there — and the build was asking
   * once per page, 384 times, to bake exactly that promise in.
   */
  it('asks nobody, and promises nothing, while the pages are being built', async () => {
    const { service, http } = serviceOn('server');

    expect(await firstValueFrom(service.getInstagramPermalink('58'))).toBeNull();
    http.verify(); // no request was made
  });
});
