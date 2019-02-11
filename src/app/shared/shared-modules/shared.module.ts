import {NgModule} from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import {PipesModule} from './pipes.module';
import {DirectiveModule} from './directive.module';

@NgModule({
  declarations: [],
  imports: [
    NgxPaginationModule,
    PipesModule,
    DirectiveModule,
  ],
  exports: [
    NgxPaginationModule,
    PipesModule,
    DirectiveModule,
  ],
  providers: []
})
export class SharedModule {
}
