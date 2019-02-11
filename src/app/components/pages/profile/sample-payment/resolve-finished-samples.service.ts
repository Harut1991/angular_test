import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SubmitSampleService} from '../submit-sample-service/submit-sample.service';
import {AuthenticationService} from '../../../../services/authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveFinishedSamplesService implements Resolve<any> {
  constructor(private sampleService: SubmitSampleService, private router: Router, private authService: AuthenticationService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    return this.sampleService.getAttachments('?paid=false&status=finished&show_all=true', -1).pipe(
      map(faqs => {
        if (faqs) {
          return of(faqs);
        } else {
          this.router.navigate(['/home']);
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
