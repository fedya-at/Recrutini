import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise<boolean | UrlTree>((resolve, reject) => {
      this.userService.isAuthenticated().subscribe(
        (isAuthenticated) => {
          if (isAuthenticated) {
            resolve(true);
          } else {
            resolve(this.router.createUrlTree(['/login']));
          }
        },
        (error) => {
          console.error('Error checking authentication:', error);
          resolve(this.router.createUrlTree(['/login']));
        }
      );
    });
  }
}
