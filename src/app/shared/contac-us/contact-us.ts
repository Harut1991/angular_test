import {FormBuilder, Validators} from '@angular/forms';
import {AbstractForm} from '../abstract-form';
import {AuthenticationService} from '../../services/authentication-service/authentication.service';
import {contactUSValidationMessages, emailPattern, userNamePattern} from '../../validation/validation-helper-model';
import {MyToastrService} from '../../services/my-toastr.service';
import {AuthForm} from '../../components/pages/authorization/auth-form';

export abstract class ContactUs extends AbstractForm {

  protected constructor(private formBuilder: FormBuilder,
                        private authService: AuthenticationService,
                        private  toastrService: MyToastrService) {
    super(contactUSValidationMessages, formBuilder);
    this.controlsConfig = {
      user_name: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(userNamePattern)])],
      email: [null, Validators.compose([Validators.required, Validators.pattern(emailPattern)])],
      description: [null, Validators.compose([Validators.required, Validators.maxLength(2000)])]
    };
    this.extras = {
      validator: [AuthForm.userNameValidator, AuthForm.fullNameWhiteSpaceValidator],
      updateOn: 'submit'
    };
  }

  makeRequest(formData): void {
    this.authService.sendQuestion(formData).subscribe(response => {
      this.onSuccess(response);
    }, error1 => {
      this.onError(error1);
    });
  }

  // in case of different implementation add this and remove toastr service from constructor
  /*abstract onSuccess(response): void;
  abstract onError(error): void;*/

  onSuccess(response): void {
    this.toastrService.success('We will get back to you within 24 hours', 'Thank you for your message');
    this.form.reset();
    setTimeout(() => {
      document.dispatchEvent(new Event('formSubmitted', {bubbles: true}));
    }, 100);
  }

  onError(error): void {
    this.toastrService.error();
  }

}
