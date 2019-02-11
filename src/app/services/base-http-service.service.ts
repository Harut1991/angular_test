import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment.prod';

export abstract class BaseHttpService {
  protected static API_URL = environment.apiUrl;

  protected constructor(protected http: HttpClient) {
  }

  protected post<T>(url: string, body: T, options = null): Observable<any> {
    if (!options) {
      return this.http.post(BaseHttpService.API_URL + url, body, {observe: 'response'}).pipe(
        map(res => res)
      );
    } else {
      return this.http.post(BaseHttpService.API_URL + url, body, options).pipe(
        map(res => res)
      );
    }
  }

  protected get<T>(url: string): Observable<HttpResponse<T>> {
    return this.http.get(BaseHttpService.API_URL + url, {observe: 'response'}).pipe(
      map(res => res as HttpResponse<T>)
    );
  }

  protected delete<T>(url: string): Observable<HttpResponse<T>> {
    return this.http.delete(BaseHttpService.API_URL + url, {observe: 'response'}).pipe(
      map(res => res as HttpResponse<T>)
    );
  }

  protected patch<T>(url: string , body: T): Observable<HttpResponse<T>> {
    return this.http.patch(BaseHttpService.API_URL + url, body, {observe: 'response'}).pipe(
      map(res => res as HttpResponse<T>)
    );
  }
}
