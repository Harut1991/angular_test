import {FormGroup} from '@angular/forms';

export interface SubmitForm {
  form: FormGroup;
  isFormValid?: boolean;
  validationMessages: any;
  extras: {
    validator?: Array<any>,
    updateOn: string
  };
  errorMessage?: string;
  emailDomain?: string;
  controlsConfig?: any;
  validateForm: () => void;
  submitForm: (formData: any) => void;
  makeRequest: (signUpFormData) => void;
  createForm: () => void;
}
