import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {UserService} from '../user.service';
import {CookieService} from 'ngx-cookie-service';
import {AuthenticationService} from '../../../../services/authentication-service/authentication.service';
import {Account} from './account.model';

@Injectable({
  providedIn: 'root'
})
export class EditProfileResolveService implements Resolve<any> {
  constructor(private userService: UserService,
              private cookie: CookieService,
              private router: Router,
              private authService: AuthenticationService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    return this.userService.getUserData<Account>(this.cookie.get('pk')).pipe(
      map(user => {
        if (user) {
          return of(user);
        } else {
          this.router.navigate(['/dashboard'], {queryParams: {page: `${1}`}});
          return EMPTY;
        }
      }), catchError((err, caught) => {
        if (err.status === 404) {
          this.router.navigate(['/dashboard'], {queryParams: {page: `${1}`}});
          return EMPTY;
        } else if (err.status === 401 || err.status === 403) {
          this.authService.logOut();
          return EMPTY;
        }
      })
    );
  }

}
