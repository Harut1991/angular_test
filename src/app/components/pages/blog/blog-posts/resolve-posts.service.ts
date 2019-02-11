import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import {BlogService} from '../blog.service';
import {ResponseModel} from '../../../../shared/models/response-model';
import {Article} from '../article.model';
import {AuthenticationService} from '../../../../services/authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ResolvePostsService implements Resolve<any> {
  constructor(private blogService: BlogService,
              private cookie: CookieService,
              private authService: AuthenticationService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    let page = route.queryParams['page'] || 1;
    return this.blogService.getPosts<ResponseModel<Article>>(`?page=${page}`, 6).pipe(
      map(posts => {
        if (posts) {
          return of(posts);
        } else {
          this.router.navigate(['/'], {queryParams: {page: `${1}`}});
          return EMPTY;
        }
      }), catchError((err, caught) => {
        if (err.status === 404) {
          this.router.navigate(['/'], {queryParams: {page: `${1}`}});
          return EMPTY;
        } else if (err.status === 401) {
          this.authService.logOut();
          return EMPTY;
        }
      })
    );
  }

}
