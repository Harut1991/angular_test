import { Directive, ElementRef, AfterViewInit } from '@angular/core';

declare const $: any;


@Directive({
  selector: '[appPopup]',
})

export class PopupDirective implements AfterViewInit {
  constructor(private el: ElementRef) {

  }

  ngAfterViewInit(): void {

    $(this.el.nativeElement).magnificPopup({
      removalDelay: 400,
      midClick: true,
      fixedContentPos: true,
      callbacks: {
        beforeOpen: function() {
          this.st.mainClass = this.st.el.attr('data-effect');
        },
        open: function() {
          $('html').css('overflow', 'hidden');

          const htmlStyle = document.documentElement.getAttribute('style');

          if (htmlStyle.indexOf('margin-right: 17px;') !== -1) {
            $('header').css('margin-right', '17px');
          }

        },
        afterClose: function() {
          $('html').css('overflow', 'visible');

          const htmlStyle = document.documentElement.getAttribute('style');

          if (htmlStyle.indexOf('margin-right: 17px;') === -1) {
            $('header').css('margin-right', '0');
          }

        }
      }
    });
  }
}
