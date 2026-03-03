import { TestBed } from '@angular/core/testing';

import { TelepulesekService } from './telepulesek.service';

describe('TelepulesekService', () => {
  let service: TelepulesekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelepulesekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
