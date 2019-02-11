import {
  AfterViewInit,
  Directive, DoCheck,
  ElementRef,
  HostListener,
  Input,
  OnInit, Renderer2
} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {NgSelectComponent} from '@ng-select/ng-select';

@Directive({
  selector: '[appFocus]',
})
export class FocusDirective implements OnInit, AfterViewInit, DoCheck {
  @Input() isFormValid = false;
  @Input() labelId: string;
  @Input() editing: boolean;
  @Input() ng_select: NgSelectComponent;
  @Input() form: AbstractControl;

  constructor(private renderer: Renderer2, private currentElement: ElementRef) {
  }

  ngOnInit(): void {
    document.addEventListener('formSubmitted', () => {
      if (!this.currentElement.nativeElement.value || this.currentElement.nativeElement.value.length > 0) {
        const label = document.getElementById(this.labelId);
        if (label) {
          label.classList.remove('shown');
        }
      }
    }, true);
  }

  private shownLabel() {
    if (this.currentElement.nativeElement.value) {
      const label = document.getElementById(this.labelId);
      label.classList.add('shown');
    } else {
      const label = document.getElementById(this.labelId);
      label.classList.remove('shown');
    }

    if (this.currentElement.nativeElement.tagName === 'NG-SELECT') {
      const input = this.currentElement.nativeElement.querySelector('.ng-select input');
      const label = document.getElementById(this.labelId);
      label.addEventListener('focus', () => {
        label.classList.add('shown');
        if (this.ng_select) {
          this.ng_select.open();
        } else {
          input.focus();
          this.currentElement.nativeElement.focus();
        }
      });
      label.addEventListener('click', () => {
        label.classList.add('shown');
        if (this.ng_select) {
          this.ng_select.open();
        } else {
          input.focus();
          this.currentElement.nativeElement.focus();
        }
      });
      label.addEventListener('focusout', () => {
        label.classList.remove('shown');
      });
      label.addEventListener('blur', () => {
        label.classList.remove('shown');
      });
      input.addEventListener('focusout', () => {
        const ngvalueLabel = this.currentElement.nativeElement.querySelector(' .ng-value-label');
        if ( ngvalueLabel && ngvalueLabel.innerHTML.length > 0) {
          const label1 = document.getElementById(this.labelId);
          label1.classList.add('shown');
        }
      });

      input.addEventListener('input', () => {
        if (input.value.length > 0) {
          const label2 = document.getElementById(this.labelId);
          label2.classList.add('shown');
        }
      });
    }
  }

  ngAfterViewInit(): void {
    this.shownLabel();
    setTimeout(() => {
      // console.log(this.currentElement.nativeElement.value);
      // if (this.currentElement.nativeElement.value) {
      //   const label = document.getElementById(this.labelId);
      //   label.classList.add('shown');
      // } else {
      //   const label = document.getElementById(this.labelId);
      //   label.classList.remove('shown');
      // }
    }, 500);
  }

  ngDoCheck(): void {
    if (this.ng_select && this.currentElement.nativeElement.tagName === 'NG-SELECT') {
      if (this.ng_select.hasValue) {
        const label = document.getElementById(this.labelId);
        label.classList.add('shown');
      }
    }
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    const label = document.getElementById(this.labelId);
    label.classList.add('shown');
  }

  @HostListener('focus')
  onFocus(): void {
    const label = document.getElementById(this.labelId);
    label.classList.add('shown');
  }

  @HostListener('blur')
  onBlur(): void {
    if (!this.currentElement.nativeElement.value) {
      const label = document.getElementById(this.labelId);
      label.classList.remove('shown');
    }
  }
}
