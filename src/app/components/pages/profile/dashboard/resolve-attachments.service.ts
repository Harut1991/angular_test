import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, forkJoin, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthenticationService} from '../../../../services/authentication-service/authentication.service';
import {SubmitSampleService} from '../submit-sample-service/submit-sample.service';
import {DashboardComponent, Status} from './dashboard.component';
import {UserService} from '../user.service';
import {ResponseModel} from '../../../../shared/models/response-model';
import {Attachment} from './attachment.model';

@Injectable({
  providedIn: 'root'
})
export class ResolveAttachmentsService implements Resolve<any> {
  private page = 1;

  constructor(private sampleService: SubmitSampleService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    let status;
    if (route.queryParams.hasOwnProperty('page')) {
      this.page = +route.queryParams['page'] === 0 ? 1 : +route.queryParams['page'];
      if (route.queryParams.hasOwnProperty('status')) {
        status = route.queryParams['status'];
      } else {
        status = Status.NOT_STARTED;
      }
    } else {
      this.page = 1;
      status = Status.NOT_STARTED;
    }
    if (!DashboardComponent.checkStatus(status)) {
      status = Status.NOT_STARTED;
    }
    return forkJoin([
      this.sampleService.getAttachments(`?status=${status}&page=${this.page}`, 12),
      this.sampleService.getPriorities(),
      this.sampleService.getAttachments<ResponseModel<Attachment>>('?paid=false&status=finished&show_all=true', -1)
    ]).pipe(
      map(results => {
        if (results[0] && results[1] && results[2]) {
          UserService.notPaidSamplesLength = results[2].body.results.length;
          return {attachments: of(results[0]), priorities: of(results[1])};
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
