import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { SharedService } from '../../shared/sharedservice/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private sharesService: SharedService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | boolean | UrlTree {
      if (this.sharesService.IsAdmin()) {
    return true;
      } else {
        this.router.navigate(['public/users/account/overview']);
        return false;
      }
  }
}
