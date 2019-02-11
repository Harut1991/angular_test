import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {AuthenticationService} from '../../../services/authentication-service/authentication.service';
import {RegistrationComponent} from './registration/registration.component';
import {DirectiveModule} from '../../../shared/shared-modules/directive.module';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ActivateComponent} from './activate/activate.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import { AuthorizationComponent } from './authorization.component';
import {CookieService} from "ngx-cookie-service";

const routes: Routes = [
  {path: '', component: AuthorizationComponent, children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'sign-up',
        component: RegistrationComponent
      },
      {
        path: 'accounts/resetpassword/:token',
        component: ResetPasswordComponent
      },
      {
        path: 'accounts/activate/:token',
        component: ActivateComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      }
    ]}
];
const routerModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ResetPasswordComponent,
    ActivateComponent,
    ForgotPasswordComponent,
    AuthorizationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    DirectiveModule,
    routerModule
  ],
  providers: [
    AuthenticationService,
    CookieService
  ],
  bootstrap: [AuthorizationComponent]
})
export class AuthorizationModule {
}
