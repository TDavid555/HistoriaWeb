import { TestBed } from '@angular/core/testing';

import { TerkepService } from './terkep.service';

describe('TerkepService', () => {
  let service: TerkepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerkepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
