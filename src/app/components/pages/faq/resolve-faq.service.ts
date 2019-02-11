import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {FaqService} from './faq.service';

@Injectable({
  providedIn: 'root',
})
export class ResolveFaqService implements Resolve<any> {
  constructor(private fs: FaqService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    if (route.queryParams.hasOwnProperty('page')) {
      if (route.queryParams.hasOwnProperty('search_param')) {
        return this.getItems(() =>
          this.fs.getQuestions(`?search_param=${route.queryParams['search_param']}&page=${route.queryParams['page']}`, 6)
        );
      } else {
        return this.getItems(() => this.fs.getQuestions(`?page=${route.queryParams['page']}`, 6));
      }
    } else {
      return this.getItems(() => this.fs.getQuestions(`?page=${1}`, 6));
    }
  }

  private getItems(modeCallback) {
    return modeCallback().pipe(
      map(faqs => {
        if (faqs) {
          return of(faqs);
        } else {
          this.router.navigate(['/home']);
          return EMPTY;
        }
      }), catchError((err, caught) => {
        if (err.status === 404) {
          this.router.navigate(['/faq'], {queryParams: {page: `${1}`}});
          return EMPTY;
        }
      })
    );
  }
}
