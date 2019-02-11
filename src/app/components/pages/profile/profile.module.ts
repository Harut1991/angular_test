import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {SubmitSampleComponent} from './submit-sample/submit-sample.component';
import {DateAdapter,
  MAT_DATE_FORMATS,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatTooltipModule} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {MOMENT_FORMATS} from '../../../shared/moment-date-adapter';
import {SubmitSampleService} from './submit-sample-service/submit-sample.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from '../../../services/token-interceptor.service';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from '../../../services/authentication-service/auth-guard.service';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {SharedModule} from '../../../shared/shared-modules/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication-service/authentication.service';
import {EditProfileResolveService} from './edit-profile/edit-profile-resolve.service';
import {UserService} from './user.service';
import {ResolveAttachmentsService} from './dashboard/resolve-attachments.service';
import {NgSelectModule} from '@ng-select/ng-select';
import {SampleComponent} from './dashboard/sample/sample.component';
import {ResolveEditSampleDataService} from './submit-sample/resolve-edit-sample-data.service';
import {RoutingState} from '../../../services/routing-state';
import {PaymentComponent} from './payment/payment.component';
import {SamplePaymentComponent} from './sample-payment/sample-payment.component';
import {ResolveFinishedSamplesService} from './sample-payment/resolve-finished-samples.service';
import {PaymentGuard} from './payment-guard.guard';
import {CookieService} from 'ngx-cookie-service';
import {PaidPipe} from '../../../pipes/paid.pipe';
import {StatusPipe} from '../../../pipes/status.pipe';

const routes: Routes = [
  {
    path: '', component: ProfileComponent, canActivate: [AuthGuardService], children: [
    {
      path: 'submit-sample',
      component: SubmitSampleComponent,
    },
    {
      path: 'edit-sample/:id',
      component: SubmitSampleComponent,
      resolve: {sample: ResolveEditSampleDataService}
    },
    {
      path: 'edit-profile',
      component: EditProfileComponent,
      resolve: {user: EditProfileResolveService}
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      resolve: {attachments: ResolveAttachmentsService}
    },
    {
      path: 'payment',
      component: PaymentComponent,
      resolve: {samples: ResolveFinishedSamplesService}
    }
  ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgSelectModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProfileComponent,
    DashboardComponent,
    SidebarComponent,
    SubmitSampleComponent,
    EditProfileComponent,
    SampleComponent,
    PaymentComponent,
    SamplePaymentComponent,
    PaidPipe,
    StatusPipe
  ],
  providers: [
    AuthGuardService,
    AuthenticationService,
    SubmitSampleService,
    EditProfileResolveService,
    ResolveAttachmentsService,
    UserService,
    CookieService,
    RoutingState,
    ResolveEditSampleDataService,
    ResolveFinishedSamplesService,
    PaymentGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {provide: DateAdapter, useClass: MomentDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MOMENT_FORMATS},
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [ProfileComponent]
})
export class ProfileModule {
}
