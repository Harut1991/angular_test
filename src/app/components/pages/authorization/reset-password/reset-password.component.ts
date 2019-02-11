import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../../services/authentication-service/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {resetPassValidationMessages} from '../../../../validation/validation-helper-model';
import {AuthForm} from '../auth-form';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent extends AuthForm implements OnInit {
  private token: string;
  isTokenValid = false;
  isResetPassSuccess = false;
  tokenVerifyError = false;
  errorMessage = 'Something went wrong, please try again.';
  isResetPassFailed = false;

  constructor(private router: Router,
              private fb: FormBuilder,
              private activatedRout: ActivatedRoute,
              private authService: AuthenticationService) {
    super(resetPassValidationMessages, fb);
    this.controlsConfig = {
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      reenter_password: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    };
    this.extras = {
      validator: [AuthForm.passwordMatchValidator],
      updateOn: 'submit'
    };
  }

  ngOnInit() {
    this.createForm();
    this.activatedRout.params.subscribe(data => {
      this.token = data['token'];
      this.authService.verifyToken({token: data['token']}).subscribe(res => {
        this.isTokenValid = true;
      }, error1 => {
        this.tokenVerifyError = true;
      });
    });
  }

  makeRequest(formData): void {
    this.authService.resetPassword({password: formData.password, token: this.token}).subscribe(res => {
      this.isFormValid = true;
      this.isResetPassSuccess = true;
      document.dispatchEvent(new Event('formSubmitted', {bubbles: true}));
    }, error => {
      if (error.error.code === 400) {
        this.isResetPassFailed = true;
      }
    });
  }

}
