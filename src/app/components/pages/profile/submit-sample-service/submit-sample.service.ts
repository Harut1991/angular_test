import {Injectable} from '@angular/core';
import {BaseHttpService} from '../../../../services/base-http-service.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable()
export class SubmitSampleService extends BaseHttpService {
  private PRIORITITES_URL = '/attachments/upload-info/';
  private SAPLE_NAME_UNIQENESS = '/attachments/check-attachment-name_uniqueness/';
  private ATTACHMENTS_URL = '/attachments/';
  private REWIEW_URL = '/attachments/review-file/';
  $isSampleDeleted: Subject<boolean>;

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  getAttachments<T>(query: string, limit: number): Observable<HttpResponse<T>> {
    return this.get(`${this.ATTACHMENTS_URL}${query}&page_size=${limit}`);
  }

  public submitSample(sample): Observable<any> {
    return this.post(this.ATTACHMENTS_URL, sample, {reportProgress: true, observe: 'events'});
  }

  public getPriorities(): Observable<HttpResponse<any>> {
    return this.get(this.PRIORITITES_URL);
  }

  public checkSampleNameUniqness(data): Observable<HttpResponse<any>> {
    return this.post(this.SAPLE_NAME_UNIQENESS, data);
  }

  getAttachment<T>(id: number): Observable<HttpResponse<T>> {
    return this.get(`${this.ATTACHMENTS_URL}${id}/`);
  }

  public async downloadReview(review_path: any): Promise<Blob> {
    return await this.httpClient.get<Blob>(`${review_path}`, {responseType: 'blob' as 'json'}).toPromise();
  }

  updateAttachment<T>(id: number, body: T): Observable<HttpResponse<T>> {
    return this.httpClient.patch(BaseHttpService.API_URL + `${this.ATTACHMENTS_URL}${id}/`,
      body,
      {reportProgress: true, observe: 'events'}).pipe(
      map(res => res as HttpResponse<T>)
    );
  }

  deleteAttachment<T>(id: number): Observable<HttpResponse<T>> {
    return this.delete(`${this.ATTACHMENTS_URL}${id}/`);
  }
}
