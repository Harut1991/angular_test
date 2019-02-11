import {Component, Input} from '@angular/core';
import {AuthenticationService} from '../../../../services/authentication-service/authentication.service';
import {FormBuilder, Validators} from '@angular/forms';
import {emailPattern, validationMessages} from '../../../../validation/validation-helper-model';
import {AuthForm} from '../auth-form';
import {MyToastrService} from '../../../../services/my-toastr.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent extends AuthForm {
  @Input() tokenVerifyError = false;
  isForgotSuccess = false;
  isForgotFailed = false;

  constructor(private authService: AuthenticationService, private fb: FormBuilder, private toastr: MyToastrService) {
    super(validationMessages, fb);
    this.controlsConfig = {
      email: [null, Validators.compose([Validators.required, Validators.pattern(emailPattern)])]
    };
  }

  makeRequest(formData): void {
    this.authService.forgotPassword(formData).subscribe(() => {
      this.isFormValid = true;
      this.isForgotSuccess = true;
      this.emailDomain = this.authService.getHostName(this.form.get('email').value);
      document.dispatchEvent(new Event('formSubmitted', {bubbles: true}));
    }, error => {
      this.isFormValid = false;
      this.isForgotSuccess = false;
      this.isForgotFailed = true;
      if (error.status === 401) {
        this.form.get('email').setErrors({'not-exist': true});
      } else {
        this.errorMessage = 'Something went wrong. Please try again.';
      }
    });
  }

  resendToken(): void {
    this.authService.forgotPassword(this.form.value).subscribe(response => {
      this.toastr.success('Reset password confirmation email was resent.', 'Success');
    }, error => {
      this.toastr.error();
    });
  }

}
