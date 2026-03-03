import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { kijelentkezettGuard } from './kijelentkezett.guard';

describe('kijelentkezettGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => kijelentkezettGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
