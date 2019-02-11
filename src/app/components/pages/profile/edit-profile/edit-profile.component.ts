import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {emailPattern, userNamePattern, validationMessages} from '../../../../validation/validation-helper-model';
import {UserService} from '../user.service';
import {AuthenticationService} from '../../../../services/authentication-service/authentication.service';
import {MyToastrService} from '../../../../services/my-toastr.service';
import {Account} from './account.model';

declare const $;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent implements OnInit {
  resetPasswordForm: FormGroup;
  emailAndUserNameForm: FormGroup;
  validationMessages;
  private user;
  private newPassword;

  constructor(private cookie: CookieService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private toastr: MyToastrService,
              private authService: AuthenticationService) {
    validationMessages['old_password'] = [
      {type: 'required', message: 'Please enter your old password'},
      {type: 'wrong_password', message: 'Your password was incorrect'},
      {type: 'minlength', message: 'Password must be at least 6 characters long'}];
    this.validationMessages = validationMessages;
  }

  ngOnInit() {
    this.activatedRoute.data
      .subscribe((data: { user: any }) => {
        this.createResetPassForm();
        this.createChangeUSerNameAndEmail();
        this.initDataAfterResolve(data.user);
      }).unsubscribe();
  }

  private initDataAfterResolve(data): void {
    if (data) {
      data.subscribe(res => {
        const us = {
          user_name: res.body.user_name,
          email: res.body.email,
        };
        this.emailAndUserNameForm.patchValue(us);
        this.resetPasswordForm.patchValue({old_pass: res.body.password});
        this.user = res.body;
        },
        error => {
        });
    }
  }

  private createResetPassForm(): void {
    this.emailAndUserNameForm = this.fb.group({
      user_name: ['',
        Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(userNamePattern)])],
      email: [null , Validators.compose([Validators.required, Validators.pattern(emailPattern)])],
    }, {
        validator: [EditProfileComponent.fullNameWhiteSpaceValidator],
        updateOn: 'submit'
      });
  }

  private createChangeUSerNameAndEmail(): void {
    this.resetPasswordForm = this.fb.group({
      old_pass: [null],
      current_password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      reenter_password: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    }, {
      validator: [EditProfileComponent.passwordMatchValidator],
      updateOn: 'submit'
    });
  }

  savePassword(): void {
    if (this.resetPasswordForm.valid) {
      const new_password = this.resetPasswordForm.get('password').value;
      const current_password = this.resetPasswordForm.get('current_password').value;
      this.userService.updateUserData<Account>(this.cookie.get('pk'), {
        password: new_password,
        current_password: current_password,
      }).subscribe(res => {
        $.magnificPopup.close();
        this.toastr.success('Password is successfully changed!', 'Change Password');
        if (this.user.password !== new_password) {
          setTimeout(() => {
            this.authService.logOut();
          }, 300);
        } else {
          this.newPassword = new_password;
          this.resetPasswordForm.reset({
            current_password: null,
            old_pass: new_password,
            password: null,
            reenter_password: null
          }, {onlySelf: true});
          document.dispatchEvent(new Event('formSubmitted', {bubbles: true}));
        }
      }, error1 =>  {
        if (error1.status === 400 && error1.error['non_field_errors'][0] === 'Please send correct current password.') {
          this.resetPasswordForm.get('current_password').setErrors({wrong_password: true});
        } else {
          this.toastr.error();
        }
      });
    } else {
      this.validateFormForm(this.resetPasswordForm);
    }
  }

  editProfile(formData): void {
    if (this.emailAndUserNameForm.valid) {
      this.userService.updateUserData(this.cookie.get('pk'), formData).subscribe(res => {
        if (this.isProfileDataChanged(formData)) {
          setTimeout(() => {
            if (this.user.user_name !== formData.user_name) {
              this.toastr.success('Name and email is successfully changed!', 'Edit Profile', 15000);
            } else {
              this.toastr.success('Email is successfully changed!', 'Edit Profile', 15000);
            }
            this.authService.logOut();
          }, 300);
        } else {
          this.toastr.success('Name is successfully changed!', 'Edit Profile', 15000);
          this.user = res.body;
        }
      }, error1 => {
        if (error1.status === 400 && error1.error['email'][0] === 'User with this email already exists.') {
          this.emailAndUserNameForm.get('email').setErrors({email_already_exist: true});
        } else {
          this.toastr.error();
        }
      });
    } else {
      this.validateFormForm(this.emailAndUserNameForm);
    }
  }

  private isProfileDataChanged(formData): boolean {
    return this.user.email !== formData.email;
  }

  validateFormForm(form: FormGroup): void {
    const controls = form.controls;
    Object.keys(controls)
      .forEach(controlName => {
        controls[controlName].markAsTouched();
        controls[controlName].markAsDirty();
      });
    return;
  }

  private static passwordMatchValidator(g: FormGroup): null | void {
    return g.get('password').value === g.get('reenter_password').value
      ? null : g.get('reenter_password').setErrors({areEqual: true});
  }

  private static fullNameWhiteSpaceValidator(g: FormGroup): null | void {
    return g.get('user_name').value && g.get('user_name').value.replace(/\s+/g, ' ').trim().length !== 0
      ? null : g.get('user_name').setErrors({required: true});
  }

}
