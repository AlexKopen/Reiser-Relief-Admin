import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(public auth: AuthService, private router: Router) {}

  canActivate() {
    if (!this.auth.authenticated) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

  canActivateChild() {
    return this.canActivate();
  }
}
