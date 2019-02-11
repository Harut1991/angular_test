import {Injectable} from '@angular/core';
import {NavigationEnd, NavigationExtras, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {parse} from 'querystring';

@Injectable()
export class RoutingState {
  private history = [];

  constructor(private router: Router) {
    this.loadRouting();
  }

  public loadRouting(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({urlAfterRedirects}: NavigationEnd) => {
        this.history = [...this.history, urlAfterRedirects];
      });
  }

  public getHistory(): string[] {
    return this.history;
  }

  public getPreviousUrl(): string {
    return this.history[this.history.length - 2] || '/dashboard';
  }

  public getCurrenturl(): string {
    return this.history[this.history.length - 1] || '/index';
  }

  getPreviousUrlAndQueryParams(): null | {url: string, queryParams: NavigationExtras} {
    if (this.history[this.history.length - 2]) {
      const fullUrl = this.history[this.history.length - 2].toString();
      if (fullUrl.indexOf('?') !== -1) {
        const queryParams = parse(fullUrl.slice(fullUrl.indexOf('?') + 1));
        return {url: fullUrl.slice(0, fullUrl.indexOf('?')), queryParams: {queryParams: queryParams}};
      } else {
        return {url: fullUrl, queryParams: {queryParams: {page: 1}}};
      }
    } else {
      return {url: '/dashboard', queryParams: {queryParams: {page: 1}}};
    }
  }
}
