import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../../services/authentication-service/authentication.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {UploadComponent} from '../../shared/upload/upload.component';
import {SubmitSampleService} from '../pages/profile/submit-sample-service/submit-sample.service';
import {CancellationPopupComponent} from '../cancelation-popup/cancellation-popup.component';
import {RoutingState} from '../../services/routing-state';
import {UserService} from '../pages/profile/user.service';

@Component({
  selector: 'app-header, [app-header]',
  templateUrl: './header.component.html',
  providers: [UploadComponent, SubmitSampleService]
})
export class HeaderComponent implements OnInit {
  @ViewChild(CancellationPopupComponent) cancellationPopup: CancellationPopupComponent;
  menuIsOpened = false;

  constructor(protected authService: AuthenticationService,
              protected router: Router,
              private routingState: RoutingState,
              private cookieService: CookieService,
              private uploader: UploadComponent) {
  }

  get userName() {
    return localStorage.getItem('user_name') || this.cookieService.get('user_name');
  }

  ngOnInit() {
  }

  openMenu(): void {
    this.menuIsOpened = true;
    document.querySelector('body').classList.add('overflow');
  }

  closeMenu(): void {
    this.menuIsOpened = false;
    document.querySelector('body').classList.remove('overflow');
  }

  logOut(): void {
    const samples = this.uploader.getUploadingSamples();
    if (!samples) {
      this.uploader.cancelUpload(false);
      this.closeMenu();
      this.authService.logOut();
    } else {
      this.cancellationPopup.openPopup();
    }
  }

  closeMenuAndUpdateRoute(): void {
    this.closeMenu();
    AuthenticationService.$registrationClicked.next(true);
  }

  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isUserOnDashboard(): boolean {
    return this.routingState.getCurrenturl().includes('dashboard') && UserService.notPaidSamplesLength !== 0;
  }

  cancelUploadAndLogout = () => {
    if (!this.uploader.getUploadingSamples()) {
      this.uploader.cancelUpload(true);
    } else {
      this.uploader.cancelUpload(false);
    }
    this.closeMenu();
    this.authService.logOut();
  }

  continueUpload = () => {
    this.uploader.continueUpload();
  }
}
