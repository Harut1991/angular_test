import {UserService} from '../user.service';
import {RouterLoaderService} from '../../../header/router-loader/router-loader.service';
import {Router} from '@angular/router';
import {MyToastrService} from '../../../../services/my-toastr.service';

declare const Stripe;

export class StripeIndex {

  errorMessage: string;
  stripe = Stripe('pk_test_rDbhQsXwrPoX0EDfJeNfSP1v');
  form;
  userService: UserService;
  loaderService: RouterLoaderService;
  sampleIdsToPay: Array<any>;
  toastr: MyToastrService;
  router: Router;
  elementStyles = {
    base: {
      color: '#32325D',
      fontWeight: 500,
      fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

      '::placeholder': {
        color: '#CFD7DF',
      },
      ':-webkit-autofill': {
        color: '#e39f48',
      },
    },
    invalid: {
      color: '#E25950',

      '::placeholder': {
        color: '#FFCCA5',
      },
    },
  };

  elementClasses = {
    focus: 'focused',
    empty: 'empty',
    invalid: 'invalid',
  };

  set samplesIds(arr) {
    this.sampleIdsToPay = arr;
  }

  constructor(userService: UserService, loaderService: RouterLoaderService, sampleIdsToPay, toastr: MyToastrService, router: Router) {
    this.userService = userService;
    this.loaderService = loaderService;
    this.sampleIdsToPay = sampleIdsToPay;
    this.toastr = toastr;
    this.router = router;
  }

  getStripeElements() {
    return this.stripe.elements({
      /*      fonts: [
              {
                cssSrc: 'https://fonts.googleapis.com/css?family=Source+Code+Pro',
              },
            ],*/
      locale: 'auto'
    });
  }

  floatLabels() {
    const inputs = document.querySelectorAll('.cell.card.stripe .input');
    setTimeout(() => {
      Array.prototype.forEach.call(inputs, function (input) {
        input.addEventListener('focus', function () {
          input.classList.add('focused');
        });
        input.addEventListener('blur', function () {
          input.classList.remove('focused');
        });
        input.addEventListener('keyup', function () {
          if (input.value.length === 0) {
            input.classList.add('empty');
          } else {
            input.classList.remove('empty');
          }
        });
      });
    });
  }

  registerElements(elements, cardName) {
    const formClass = '.' + cardName;
    const example = document.querySelector(formClass);

    this.form = example.querySelector('form');
    // var resetButton = example.querySelector('a.reset');
    // var error = form.querySelector('.error');
    // var errorMessage: any = error.querySelector('.message');

    this.triggerBrowserValidation();

    // Listen for errors from each Element, and show error messages in the UI.
    const savedErrors = {};
    elements.forEach((element, idx) => {
      element.on('change', (event) => {
        if (event.error) {
          // error.classList.add('visible');
          savedErrors[idx] = event.error.message;
          setTimeout(() => {
            this.errorMessage = event.error.message;
          });
        } else {
          savedErrors[idx] = null;

          // Loop over the saved errors and find the first one, if any.
          const nextError = Object.keys(savedErrors)
            .sort()
            .reduce(function (maybeFoundError, key) {
              return maybeFoundError || savedErrors[key];
            }, null);

          if (nextError) {
            // Now that they've fixed the current error, show another one.
            this.errorMessage = nextError;
          } else {
            // The user fixed the last error; no more errors.
            this.errorMessage = '';
            // error.classList.remove('visible');
          }
        }
      });
    });

    // Listen on the form's 'submit' handler...
    this.addSubmitEventListener(example, cardName, elements);

  }

  addSubmitEventListener(example, cardName, elements) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = <HTMLInputElement>this.form.querySelector('#' + cardName + '-name');
      /*const address1 = <HTMLInputElement>form.querySelector('#' + exampleName + '-address');
      const zip = <HTMLInputElement>form.querySelector('#' + exampleName + '-zip');*/
      const additionalData = {
        name: name ? name.value : undefined,
      };
      if (this.sampleIdsToPay.length === 0) {
        this.errorMessage = 'Please select samples from list';
        return;
      } else if (!additionalData.name) {
        this.errorMessage = 'Card holder name is incomplete.';
        return;
      }
      // Trigger HTML5 validation UI on the form if any of the inputs fail
      // validation.
      let plainInputsValid = true;
      Array.prototype.forEach.call(this.form.querySelectorAll('input'), function (
        input
      ) {
        if (input.checkValidity && !input.checkValidity()) {
          plainInputsValid = false;
          return;
        }
      });
      if (!plainInputsValid) {
        this.triggerBrowserValidation();
        return;
      }
      this.errorMessage = undefined;

      // Show a loading screen...
      example.classList.add('submitting');

      // Disable all inputs.
      this.disableInputs();
      // Gather additional customer data we may have collected in our form.
      // Use Stripe.js to create a token. We only need to pass in one Element
      // from the Element group in order to create a token. We can also pass
      // in the additional customer data we collected in our form.
      this.loaderService.$loader.next(true);
      this.stripe.createToken(elements[0], additionalData).then((result) => {
        // Stop loading!
        example.classList.remove('submitting');

        if (result.error) {
          // Inform the user if there was an error.
          this.errorMessage = result.error.message;
          this.enableInputs();
          this.loaderService.$loader.next(false);
        } else if (result.token) {
          const body = {
            token: result.token.id,
            ids: this.sampleIdsToPay
          };
          this.userService.makePayment(body).subscribe(res => {
            this.router.navigate(['/dashboard'], {queryParams: {status: 'finished', page: 1}}).then(() => {
              this.loaderService.$loader.next(false);
              this.toastr.success('Payment successfully done', 'Payment', 0, true, true);
            });
          }, error => {
            this.errorMessage = error.error.message;
            this.loaderService.$loader.next({loader: false});
          });
          // Send the token to your server.
          example.classList.add('submitted');
        }
      });
    });
  }

  enableInputs() {
    /* Array.prototype.forEach.call(
       this.form.querySelectorAll(
         'input[type=\'text\'], input[type=\'email\'], input[type=\'tel\']'
       ),
       function (input) {
         input.removeAttribute('disabled');
       }
     );*/
  }

  disableInputs() {
    /*Array.prototype.forEach.call(
      this.form.querySelectorAll(
        'input[type=\'text\'], input[type=\'email\'], input[type=\'tel\']'
      ),
      (input) => {
        input.setAttribute('disabled', 'true');
      }
    );*/
  }

  triggerBrowserValidation() {
    // The only way to trigger HTML5 form validation UI is to fake a user submit
    // event.
    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.style.display = 'none';
    this.form.appendChild(submit);
    submit.click();
    submit.remove();
  }
}
