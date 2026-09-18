import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ProjectComponent],
      providers: [provideRouter([]), provideTranslateService()],
    });
    fixture = TestBed.createComponent(ProjectComponent);
    await fixture.whenStable();
  });

  /**
   * Where he is coming from, what it is for, then how it is built. The argument
   * about keeping requirements honest comes after all three, because it means
   * nothing to a reader who does not yet know what "it" is.
   */
  it('says what the product is for before how it is kept honest', () => {
    const headings = [...fixture.nativeElement.querySelectorAll('h2')].map((node: Element) =>
      node.textContent?.trim()
    );

    expect(headings.slice(0, 3)).toEqual([
      'project.about.title',
      'project.product.title',
      'project.architecture.title',
    ]);
    expect(headings.indexOf('project.rot.title')).toBeGreaterThan(2);
  });

  it('gives each of the three aims its own case', () => {
    expect(fixture.nativeElement.querySelectorAll('.project-goals li')).toHaveLength(3);
  });

  it('leads with counted figures rather than adjectives', () => {
    const figures = [...fixture.nativeElement.querySelectorAll('.project-figure dt')].map(
      (node: Element) => node.textContent?.trim()
    );

    expect(figures).toEqual(['147', '180', '25', '1']);
  });

  /**
   * The repository this page ships in is public and the service's is not.
   * Linking the private one would offer a recruiter a 404 and tell everybody
   * else where to knock.
   */
  it('links only the repository that is public', () => {
    const links = [...fixture.nativeElement.querySelectorAll('a')].map((a: HTMLAnchorElement) =>
      a.getAttribute('href')
    );

    expect(links.some((href) => href?.endsWith('/juanmamoreno'))).toBe(true);
    expect(links.some((href) => href?.includes('juanmamoreno-backend'))).toBe(false);
    expect(links.some((href) => href?.includes('juanmamoreno-contracts'))).toBe(false);
  });
});
