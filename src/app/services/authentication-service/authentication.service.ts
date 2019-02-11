import {Injectable} from '@angular/core';
import {BaseHttpService} from '../base-http-service.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable, Subject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

interface SignUp {
  user_name: string;
  email: string;
  password: string;
  is_active: boolean;
}

@Injectable()
export class AuthenticationService extends BaseHttpService {

  static $registrationClicked: Subject<any> = new Subject<any>();
  private signUpReq: SignUp;
  private SIGNUP_URL = '/accounts/register/';
  private ACTIVATE_USER = '/accounts/activate/';
  private VERIFY_TOKEN = '/accounts/verify/';
  private RESEND_TOKEN = '/accounts/resend-token/';
  private LOGIN_URL = '/accounts/login/';
  private QUESTION_URL = '/accounts/question/';
  private FORGOT_PASSWORD_URL = '/accounts/forgotpassword/';
  private RESET_PASSWORD_URL = '/accounts/resetpassword/';

  constructor(protected httpClient: HttpClient, private cookiesService: CookieService, private router: Router) {
    super(httpClient);
    this.signUpReq = {user_name: '', email: '', password: '', is_active: true};
  }

  public signUp(userData): Observable<HttpResponse<any>> {
    this.signUpReq.user_name = userData.user_name.replace(/\s+/g, ' ').trim();
    this.signUpReq.email = userData.email;
    this.signUpReq.password = userData.password;
    return this.post<SignUp>(this.SIGNUP_URL, this.signUpReq);
  }

  public logIn(userData): Observable<HttpResponse<any>> {
    return this.post(this.LOGIN_URL, {'email': userData.email, 'password': userData.password});
  }

  public resendToken(data) {
    return this.post(this.RESEND_TOKEN, data);
  }

  public forgotPassword(userData): Observable<HttpResponse<any>> {
    return this.post(this.FORGOT_PASSWORD_URL, userData);
  }

  activateUser(token: object): Observable<HttpResponse<any>> {
    return this.post(this.ACTIVATE_USER, token);
  }

  public getToken(): string {
    return localStorage.getItem('token') || this.cookiesService.get('token');
  }

  resetPassword(data): Observable<HttpResponse<any>> {
    return this.post(this.RESET_PASSWORD_URL, data);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token') || this.cookiesService.check('token');
  }

  sendQuestion(body) {
    return this.post(this.QUESTION_URL, body);
  }

  getHostName(email: string): string {
    return 'https://' + email.slice(email.lastIndexOf('@') + 1);
  }

  verifyToken(body) {
    return this.post(this.VERIFY_TOKEN, body);
  }

  logOut() {
    this.cookiesService.delete('token');
    this.cookiesService.delete('user_name');
    this.cookiesService.delete('pk');
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('pk');
    this.router.navigate(['/login']);
  }
}
