export const validationMessages = {
  'email': [
    {type: 'required', message: 'Please enter your email.'},
    {type: 'pattern', message: 'Please enter a valid email.'},
    {type: 'not-exist', message: 'Email address does not exist.'},
    {type: 'email_already_exist', message: 'User with this email already exist.'},
  ],
  'confirm_password': [
    {type: 'required', message: 'Please confirm your password.'},
    {type: 'areEqual', message: 'Passwords do not match.'},
    {type: 'minlength', message: 'Password must be at least 6 characters long.'}
  ],
  'password': [
    {type: 'required', message: 'Please enter your password.'},
    {type: 'minlength', message: 'Password must be at least 6 characters long.'},
  ],
  'name': [
    {type: 'required', message: 'Please enter your Name.'},
    {type: 'minlength', message: 'Name must be at least 2 characters long.'},
    {type: 'pattern', message: 'Name must contain only letters.'},
    {type: 'patternandminlength', message: 'Name must be at least 2 characters long and contain only letters.'}
  ]
};
export let emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export let userNamePattern: RegExp = /^[a-zA-Z-' ]*$/;

export const resetPassValidationMessages = {
  'confirm_password': [
    {type: 'required', message: 'Please confirm your password.'},
    {type: 'areEqual', message: 'Passwords do not match.'},
    {type: 'minlength', message: 'Password must be at least 6 characters long.'}
  ],
  'password': [
    {type: 'required', message: 'Please enter your password.'},
    {type: 'minlength', message: 'Password must be at least 6 characters long.'},
  ],
};

export const contactUSValidationMessages = {
  'name': [
    {type: 'required', message: 'Please enter your Name.'},
    {type: 'minlength', message: 'Name must be at least 2 characters long.'},
    {type: 'pattern', message: 'Name must contain only letters.'},
    {type: 'patternandminlength', message: 'Name must be at least 2 characters long and contain only letters.'}
  ],
  'email': [
    {type: 'required', message: 'Please enter your email.'},
    {type: 'pattern', message: 'Please enter a valid email.'},
  ],
  'description': [
    {type: 'required', message: 'Please enter description for more information.'},
    {type: 'maxlength', message: 'Description should not exceed 2000 symbols.'}
  ]
};

