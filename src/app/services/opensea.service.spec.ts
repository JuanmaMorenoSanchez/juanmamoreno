import { TestBed } from '@angular/core/testing';

import { OpenseaService } from './opensea.service';

describe('OpenseaService', () => {
  let service: OpenseaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenseaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
