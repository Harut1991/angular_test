import {NgModule} from '@angular/core';
import {NoPreloading, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/pages/home/home.component';
import {HowItWorksComponent} from './components/pages/how-it-works/how-it-works.component';
import {FaqComponent} from './components/pages/faq/faq.component';
import {AboutUsComponent} from './components/pages/about-us/about-us.component';
import {NotFoundComponent} from './components/pages/not-found/not-found.component';
import {ResolveFaqService} from './components/pages/faq/resolve-faq.service';
import {ContactUsComponent} from './components/pages/contact-us/contact-us.component';
import {PricingComponent} from './components/pages/pricing/pricing.component';
import {DemoComponent} from './components/pages/demo/demo.component';
import {PrivacyPolicyComponent} from './components/pages/privacy-policy/privacy-policy.component';
import {ScanningComponent} from './components/pages/scanning/scanning.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'how-it-works',
    component: HowItWorksComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'faq',
    component: FaqComponent,
    resolve: {faqs: ResolveFaqService}
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'pricing',
    component: PricingComponent
  },
  {
    path: 'scanning',
    component: ScanningComponent
  },
  {
    path: 'demo',
    component: DemoComponent
  },
  {
    path: 'scanning',
    component: ScanningComponent
  },
  {
    path: '',
    loadChildren: './components/pages/authorization/authorization.module#AuthorizationModule'
  },
  {
    path: '',
    loadChildren: './components/pages/profile/profile.module#ProfileModule'
  },
  {
    path: 'blog',
    loadChildren: './components/pages/blog/blog.module#BlogModule'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: NoPreloading,
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
  providers: [ResolveFaqService]
})
export class AppRoutingModule {
}
