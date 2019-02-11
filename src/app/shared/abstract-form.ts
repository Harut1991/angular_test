import {OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SubmitForm} from '../components/pages/authorization/submit-form';

export abstract class AbstractForm implements SubmitForm, OnInit {
  form: FormGroup;
  validationMessages;
  controlsConfig;
  errorMessage: string;
  extras = {
    validator: [],
    updateOn: 'submit'
  };

  protected constructor(
    validationMessages,
    private builder: FormBuilder
  ) {
    this.validationMessages = validationMessages;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.builder.group(this.controlsConfig, this.extras);
  }

  submitForm(formData): void {
    if (this.form.valid) {
      this.makeRequest(formData);
    } else {
      this.validateForm();
      return;
    }
  }

  validateForm() {
    const controls = this.form.controls;
    Object.keys(controls)
      .forEach(controlName => {
        controls[controlName].markAsTouched();
        controls[controlName].markAsDirty();
      });
    return;
  }

  abstract makeRequest(formData): void;
}
