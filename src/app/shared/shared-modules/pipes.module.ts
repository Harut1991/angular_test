import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DateFormat} from '../../pipes/dateFormat.pipe';
import {EmptyFormatPipe} from '../../pipes/empty-format.pipe';
import {SafeHtmlPipe} from '../../pipes/safe-html-pipe.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DateFormat,
    SafeHtmlPipe,
    EmptyFormatPipe
  ],
  exports: [
    DateFormat,
    SafeHtmlPipe,
    EmptyFormatPipe
  ]
})
export class PipesModule {
}
