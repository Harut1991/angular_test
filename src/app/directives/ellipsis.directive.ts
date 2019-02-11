import {Directive, ElementRef, AfterViewInit} from '@angular/core';

declare const $: any;


@Directive({
  selector: '[appEllipsis]',
})
export class EllipsisDirective implements AfterViewInit {
  constructor(private el: ElementRef) {
  }

  ngAfterViewInit(): void {

    const maxHeight = parseInt(this.el.nativeElement.dataset.maxHeight, 10);

    $(this.el.nativeElement).dotdotdot({
      ellipsis: '...',
      wrap: 'letter',
      watch: true,
      height: maxHeight
    });
  }
}
