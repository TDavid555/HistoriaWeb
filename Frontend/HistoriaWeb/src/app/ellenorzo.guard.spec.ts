import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ellenorzoGuard } from './ellenorzo.guard';

describe('ellenorzoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => ellenorzoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
