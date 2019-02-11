import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BaseHttpService} from '../../../services/base-http-service.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaqService extends BaseHttpService {
  private QUESTION_URL = '/FAQs/';

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  getQuestions<T>(query: string, limit: number): Observable<HttpResponse<T>> {
    return this.get(`${this.QUESTION_URL}${query}&page_size=${limit}`);
  }

}
