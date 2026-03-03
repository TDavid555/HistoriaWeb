import { TestBed } from '@angular/core/testing';

import { TortenetekService } from './tortenetek.service';

describe('TortenetekService', () => {
  let service: TortenetekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TortenetekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
