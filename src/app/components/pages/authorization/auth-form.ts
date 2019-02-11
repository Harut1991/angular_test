import {SubmitForm} from './submit-form';
import {OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AbstractForm} from '../../../shared/abstract-form';

export abstract class AuthForm extends AbstractForm implements SubmitForm, OnInit {
  isFormValid = false;
  emailDomain: string;

  protected constructor(validationMessages, private formBuilder: FormBuilder) {
    super(validationMessages, formBuilder);
  }

  static userNameValidator(g: FormGroup): null | void {
    return g.get('user_name').hasError('pattern') && g.get('user_name').hasError('minlength')
      ? g.get('user_name').setErrors({patternandminlength: true}) : null;
  }

  static passwordMatchValidator(g: FormGroup): null | void {
    return g.get('password').value === g.get('reenter_password').value
      ? null : g.get('reenter_password').setErrors({areEqual: true});
  }

  static fullNameWhiteSpaceValidator(g: FormGroup): null | void {
    return g.get('user_name').value && g.get('user_name').value.replace(/\s+/g, ' ').trim().length !== 0
      ? null : g.get('user_name').setErrors({required: true});
  }
}

