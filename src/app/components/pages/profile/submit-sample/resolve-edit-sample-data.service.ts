import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, forkJoin, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthenticationService} from '../../../../services/authentication-service/authentication.service';
import {SubmitSampleService} from '../submit-sample-service/submit-sample.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveEditSampleDataService implements Resolve<any> {

  constructor(private sampleService: SubmitSampleService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    return forkJoin([
      this.sampleService.getAttachment(route.params.id),
      this.sampleService.getPriorities()
    ]).pipe(
      map(results => {
        if (results[0] && results[1]) {
          return {attachment: of(results[0]), priorities: of(results[1])};
        } else {
          this.router.navigate(['/home']);
          return EMPTY;
        }
      }), catchError((err, caught) => {
        if (err.status === 404) {
          this.router.navigate(['/home']);
          return EMPTY;
        } else if (err.status === 401 || err.status === 403) {
          this.authService.logOut();
          return EMPTY;
        }
      })
    );
  }

}
