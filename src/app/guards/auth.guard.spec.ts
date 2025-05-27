import { runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let routerSpy: jasmine.SpyObj<Router>;

  const routeMock = {} as ActivatedRouteSnapshot;
  const stateMock = {} as RouterStateSnapshot;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj<Router>('Router', ['createUrlTree']);
    routerSpy.createUrlTree.and.callFake((commands: any[]) => {
      return { redirectedTo: commands } as unknown as UrlTree;
    });

    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerSpy }],
    });

    sessionStorage.clear();
  });

  it('should allow access when user is in sessionStorage', () => {
    sessionStorage.setItem(
      'user',
      JSON.stringify({ email: 'test@example.com' })
    );

    const result = runInInjectionContext(TestBed, () =>
      authGuard(routeMock, stateMock)
    );

    expect(result).toBeTrue();
  });

  it('should redirect to /login when no user in sessionStorage', () => {
    const result = runInInjectionContext(TestBed, () =>
      authGuard(routeMock, stateMock)
    );

    expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/login']);
    expect((result as any).redirectedTo).toEqual(['/login']);
  });
});
