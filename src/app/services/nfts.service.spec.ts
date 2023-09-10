import { TestBed } from '@angular/core/testing';

import { NftsService } from './nfts.service';

describe('NftsService', () => {
  let service: NftsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NftsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
