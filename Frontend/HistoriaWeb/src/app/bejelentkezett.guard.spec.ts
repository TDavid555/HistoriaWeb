import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { bejelentkezettGuard } from './bejelentkezett.guard';

describe('bejelentkezettGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => bejelentkezettGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
