import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    if (this.authService.isLoggedOut()) {
      return true;
    }
    // not logged in so redirect to login page with the return url and return false
    //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    this.router.navigate(['/shops']);
    return false;
  }
}