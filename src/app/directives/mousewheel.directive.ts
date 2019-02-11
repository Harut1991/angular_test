import {AfterViewInit, Directive, ElementRef} from '@angular/core';


declare const $;

@Directive({
  selector: '[app-mousewheel]'
})

export class MousewheelDirective implements AfterViewInit {
  constructor(private el: ElementRef) {

  }

  ngAfterViewInit() {
    this.el.nativeElement.addEventListener('mousewheel', e => {
      e.preventDefault();
      if (e.deltaY < 0) {
        $(this.el.nativeElement.firstElementChild).slick('slickPrev');
      } else {
        $(this.el.nativeElement.firstElementChild).slick('slickNext');
      }
    });
  }

}
