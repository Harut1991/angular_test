import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication-service/authentication.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html'
})
export class PricingComponent implements OnInit {

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {}

  get getStartedUrl(): string {
    if (this.authService.isLoggedIn()) {
      return '/submit-sample';
    } else {
      return '/sign-up';
    }
  }

}
