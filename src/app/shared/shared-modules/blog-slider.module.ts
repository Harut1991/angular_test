import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlogSliderComponent} from '../../components/blog-slider/blog-slider.component';
import {SlickModule} from 'ngx-slick';
import {RouterModule} from '@angular/router';
import {PipesModule} from './pipes.module';
import {DirectiveModule} from './directive.module';

@NgModule({
  declarations: [
    BlogSliderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    DirectiveModule,
    SlickModule.forRoot(),
  ],
  exports: [
    BlogSliderComponent,
    SlickModule,
    PipesModule,
    DirectiveModule
  ]
})
export class BlogSliderModule {
}
