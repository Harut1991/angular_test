// modules
import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {CommonModule} from '@angular/common';
import {environment} from '../environments/environment.prod';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {SharedModule} from './shared/shared-modules/shared.module';
import {RouterModule} from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// services
import {AuthenticationService} from './services/authentication-service/authentication.service';
import {CookieService} from 'ngx-cookie-service';
import {RouterLoaderService} from './components/header/router-loader/router-loader.service';
import {WidgetService} from './components/chat-widget/widget.service';
import {RoutingState} from './services/routing-state';
// pages
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {HomeComponent} from './components/pages/home/home.component';
import {FooterComponent} from './components/footer/footer.component';
import {HowItWorksComponent} from './components/pages/how-it-works/how-it-works.component';
import {FaqComponent} from './components/pages/faq/faq.component';
import {UploadComponent} from './shared/upload/upload.component';
import {AboutUsComponent} from './components/pages/about-us/about-us.component';
import {NotFoundComponent} from './components/pages/not-found/not-found.component';
import {RouterLoaderComponent} from './components/header/router-loader/router-loader.component';
import {ContactUsComponent} from './components/pages/contact-us/contact-us.component';
import {PricingComponent} from './components/pages/pricing/pricing.component';
import {HomeContactUsComponent} from './components/pages/home/home-contact-us/home-contact-us.component';
import {DemoComponent} from './components/pages/demo/demo.component';
import {ChatWidgetComponent} from './components/chat-widget/chat-widget.component';
import {CancellationPopupComponent} from './components/cancelation-popup/cancellation-popup.component';
import {PrivacyPolicyComponent} from './components/pages/privacy-policy/privacy-policy.component';
import {BlogSliderModule} from './shared/shared-modules/blog-slider.module';
import {ScanningComponent} from './components/pages/scanning/scanning.component';
import {ScanningService} from './components/pages/scanning/scanning.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    HowItWorksComponent,
    FaqComponent,
    UploadComponent,
    AboutUsComponent,
    NotFoundComponent,
    RouterLoaderComponent,
    ContactUsComponent,
    PricingComponent,
    HomeContactUsComponent,
    DemoComponent,
    ChatWidgetComponent,
    CancellationPopupComponent,
    PrivacyPolicyComponent,
    ScanningComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatProgressSpinnerModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    BlogSliderModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true,
      preventDuplicates: true,
    }),
    HttpClientModule,
   /* ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    })*/
  ],
  providers: [
    ToastrService,
    RouterLoaderService,
    CookieService,
    RoutingState,
    WidgetService,
    AuthenticationService,
    ScanningService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
