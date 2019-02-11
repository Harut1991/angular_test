import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication-service/authentication.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        accept: '*/*',
        Authorization: 'JWT ' + `${this.auth.getToken()}`
      }
    });
    return next.handle(request);
  }
}
