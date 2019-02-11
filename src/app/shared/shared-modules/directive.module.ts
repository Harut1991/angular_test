import {NgModule} from '@angular/core';
import {FocusDirective} from '../../directives/focus.directive';
import {ErrorMessageClassDirective} from '../../directives/error-message-class.directive';
import {FileDragAndDropDirective} from '../../directives/drag-and-drop.directive';
import {MousewheelDirective} from '../../directives/mousewheel.directive';
import {PopupDirective} from '../../directives/popup.directive';
import {EllipsisDirective} from '../../directives/ellipsis.directive';
import {FileValueAccessor} from '../../directives/file-control-value-accessor.directive';

@NgModule({
  declarations: [
    FocusDirective,
    ErrorMessageClassDirective,
    FileDragAndDropDirective,
    MousewheelDirective,
    EllipsisDirective,
    PopupDirective,
    FileValueAccessor
  ],
  exports: [
    FocusDirective,
    ErrorMessageClassDirective,
    FileDragAndDropDirective,
    MousewheelDirective,
    EllipsisDirective,
    PopupDirective,
    FileValueAccessor
  ]
})
export class DirectiveModule {
}
