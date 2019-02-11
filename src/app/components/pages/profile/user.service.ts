import { Injectable } from '@angular/core';
import {BaseHttpService} from '../../../services/base-http-service.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService {
  private ACCOUNTS_URL = '/accounts/';
  private ACCOUNT_PAYMENT = '/accounts/stripe-payment/';
  private totalAmount: string;
  static notPaidSamplesLength = 0;

  get getAmount() {
    return this.totalAmount;
  }

  set amount(totalAmount: string) {
    this.totalAmount = totalAmount;
  }

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  getUserData<T>(id): Observable<HttpResponse<T>> {
    return this.get(`${this.ACCOUNTS_URL}${id}/`);
  }

  updateUserData<T>(id, data): Observable<HttpResponse<T>> {
    return this.patch(`${this.ACCOUNTS_URL}${id}/`, data);
  }

  makePayment(body): Observable<HttpResponse<any>> {
    return this.post(this.ACCOUNT_PAYMENT, body);
  }

}
