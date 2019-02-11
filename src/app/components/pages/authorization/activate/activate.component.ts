import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../../services/authentication-service/authentication.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html'
})
export class ActivateComponent implements OnInit {
  activationFailed = false;
  isActivationSuccess = false;

  constructor(private router: Router, private activatedRout: ActivatedRoute, private authService: AuthenticationService) { }

  ngOnInit() {
    this.activatedRout.params.subscribe(data => {
      this.authService.activateUser({token: data['token']}).subscribe(() => {
          // this.activationFailed = true;
        this.isActivationSuccess = true;
          this.router.navigate(['/login']);
      },
      error1 => {
        this.isActivationSuccess = false;
        this.activationFailed = true;
        // this.router.navigate(['/page-not-found']);
      });
    });
  }

}
