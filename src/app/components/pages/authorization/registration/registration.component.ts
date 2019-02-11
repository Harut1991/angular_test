import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {emailPattern, userNamePattern, validationMessages} from '../../../../validation/validation-helper-model';
import {AuthenticationService} from '../../../../services/authentication-service/authentication.service';
import {AuthForm} from '../auth-form';
import {MyToastrService} from '../../../../services/my-toastr.service';

@Component({
  selector: 'app-registration, [app-registration]',
  templateUrl: './registration.component.html',
  providers: [AuthenticationService]
})
export class RegistrationComponent extends AuthForm {
  signUpFailedMessage = 'Something went wrong, please try again.';
  isSignUpSuccess = false;
  isRegFailed = false;

  constructor(private fb: FormBuilder,
              protected authService: AuthenticationService,
              private toastr: MyToastrService) {
    super(validationMessages, fb);
    this.controlsConfig = {
      user_name: ['', {
        validators: Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(userNamePattern)])
      }],
      is_active: [{value: true}],
      email: ['', {
        validators: Validators.compose([Validators.required, Validators.pattern(emailPattern)])
      }],
      password: ['', {
        validators: Validators.compose([Validators.required, Validators.minLength(6)])
      }],
      reenter_password: ['', {
        validators: Validators.compose([Validators.required, Validators.minLength(6)])
      }]
    };
    this.extras = {
      validator: [AuthForm.passwordMatchValidator, AuthForm.fullNameWhiteSpaceValidator, AuthForm.userNameValidator],
      updateOn: 'submit'
    };
    AuthenticationService.$registrationClicked.subscribe(() => {
      if (this.isFormValid && this.isSignUpSuccess && !this.isRegFailed) {
        this.form.reset();
        this.isFormValid = false;
        this.isSignUpSuccess = false;
      }
    });
  }

  makeRequest(formData): void {
    this.isFormValid = true;
    this.authService.signUp(this.form.value).subscribe(response => {
      setTimeout(() => {
        this.isSignUpSuccess = true;
        this.isRegFailed = false;
        this.emailDomain = this.authService.getHostName(this.form.get('email').value);
        document.dispatchEvent(new Event('formSubmitted', {bubbles: true}));
      });
    }, error => {
      if (error.error.hasOwnProperty('email')) {
        this.form.get('email').setErrors({email_already_exist: true});
        setTimeout(() => {
          this.isFormValid = false;
          this.isSignUpSuccess = false;
        }, 500);
      } else {
        setTimeout(() => {
          this.isFormValid = false;
          this.isSignUpSuccess = false;
          this.isRegFailed = true;
        }, 500);
      }
    });
  }

  resendToken(): void {
    this.authService.resendToken({email: this.form.value.email}).subscribe(() =>
        this.toastr.success('Account confirmation email was resent.', 'Success')
      , () => this.toastr.error());
  }
}
