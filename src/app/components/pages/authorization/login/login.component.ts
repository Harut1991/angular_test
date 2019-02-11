import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {emailPattern, validationMessages} from '../../../../validation/validation-helper-model';
import {AuthenticationService} from '../../../../services/authentication-service/authentication.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AuthForm} from '../auth-form';

@Component({
  selector: 'app-login, [app-login]',
  templateUrl: './login.component.html',
  providers: [AuthenticationService]
})
export class LoginComponent extends AuthForm {
  isLoginFailed = false;

  constructor(private fb: FormBuilder, protected authService: AuthenticationService, private router: Router,
              private cookies: CookieService) {
    super(validationMessages, fb);
    this.controlsConfig = {
      email: ['', {
        validators: Validators.compose([Validators.required, Validators.pattern(emailPattern)])
      }],
      password: ['', {
        validators: Validators.compose([Validators.required, Validators.minLength(6)])
      }]
    };
  }

  makeRequest(formData): void {
    this.authService.logIn(formData).subscribe(response => {
      const res = response.body;
      this.cookies.set('token', res['auth_token']);
      this.cookies.set('user_name', res['user_name']);
      this.cookies.set('pk', res['pk']);
      localStorage.setItem('token', res['auth_token']);
      localStorage.setItem('user_name', res['user_name']);
      localStorage.setItem('pk', res['pk']);
      this.router.navigate(['/dashboard']);
    }, error => {
      if (error.error.hasOwnProperty('non_field_errors')) {
        this.errorMessage = error.error['non_field_errors'][0];
      } else if (error.error.hasOwnProperty('email')) {
        this.errorMessage = error.error['email'][0];
      } else if (error.status === 0) {
        this.errorMessage = 'Internet connection refused! Please try again.';
      } else {
        this.errorMessage = 'Something went wrong, please try again.';
      }
      this.isLoginFailed = true;
    });
  }

}
