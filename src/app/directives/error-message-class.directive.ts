import {Directive, DoCheck, ElementRef, HostBinding, Input, Renderer2} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Directive({
  selector: '[toggleErrClass]'
})
export class ErrorMessageClassDirective implements DoCheck {

  @Input()
  formControlElement: AbstractControl;

  @HostBinding('class.className') className;

  constructor(private renderer: Renderer2, private hostElement: ElementRef) {
  }

  ngDoCheck(): void {
    if ((this.formControlElement.errors && this.formControlElement.touched && this.formControlElement.dirty)
      || this.formControlElement.pending) {
      this.renderer.addClass(this.hostElement.nativeElement, 'has-error');
    } else if (this.formControlElement.valid) {
      this.renderer.removeClass(this.hostElement.nativeElement, 'has-error');
    } else {
      this.formControlElement.markAsUntouched();
    }
  }
}

