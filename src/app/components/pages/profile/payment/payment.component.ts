import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../user.service';
import {StripeIndex} from './stripe-index';
import {SamplePaymentComponent} from '../sample-payment/sample-payment.component';
import {RouterLoaderService} from '../../../header/router-loader/router-loader.service';
import {Router} from '@angular/router';
import {MyToastrService} from '../../../../services/my-toastr.service';

@Component({
  selector: 'app-payment, [app-payment]',
  styleUrls: ['payment.component.css'],
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit, OnDestroy, AfterViewInit {
  stripe: StripeIndex;
  @ViewChild(SamplePaymentComponent) samplePayment: SamplePaymentComponent;
  elements;
  card;
  errorMessage: string;
  amount: string;

  constructor(public userService: UserService,
              private toastr: MyToastrService,
              private router: Router,
              private routerLoader: RouterLoaderService) {
  }

  ngOnInit() {
    this.amount = this.userService.getAmount;
  }

  ngOnDestroy(): void {
    this.card.destroy();
  }

  ngAfterViewInit(): void {
    this.stripe = new StripeIndex(this.userService, this.routerLoader, this.samplePayment.sampleIdsToPay, this.toastr, this.router);
    this.errorMessage = this.stripe.errorMessage;
    this.elements = this.stripe.stripe.elements();
    this.card = this.elements.create('card');
    const elements = this.stripe.getStripeElements();
    // Floating labels
    this.stripe.floatLabels();

    const cardNumber = elements.create('cardNumber', {
      style: this.stripe.elementStyles,
      classes: this.stripe.elementClasses,
    });
    cardNumber.mount('#stripe-card-number');

    const cardExpiry = elements.create('cardExpiry', {
      style: this.stripe.elementStyles,
      classes: this.stripe.elementClasses,
    });
    cardExpiry.mount('#stripe-card-expiry');

    const cardCvc = elements.create('cardCvc', {
      style: this.stripe.elementStyles,
      classes: this.stripe.elementClasses,
    });
    cardCvc.mount('#stripe-card-cvc');
    this.stripe.registerElements([cardNumber, cardExpiry, cardCvc], 'stripe');
  }

}
