import {TestBed} from '@angular/core/testing';
import {CanActivateFn} from '@angular/router';

import {authGurad} from './auth-gurad';

describe('authGuradGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGurad(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
