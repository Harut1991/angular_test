import {Injectable} from '@angular/core';
import {BaseHttpService} from '../../../services/base-http-service.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends BaseHttpService {
  private ARTICLES = '/Articles/';

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  getPosts<T>(query: string, limit: number): Observable<HttpResponse<T>> {
    return this.get(`${this.ARTICLES}${query}&page_size=${limit}`);
  }

  getArticle<T>(id: any): Observable<HttpResponse<T>> {
    return this.get(`${this.ARTICLES}${id}/`);
  }
}
