import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-linked-in-share, [app-linked-in-share]',
  template: `<a #share_linked><i class="icon-linked-in"></i></a>`
})
export class LinkedInShareComponent implements OnInit {

  @Input() url = location.href;
  @ViewChild('share_linked') element: ElementRef;

  constructor() {
    const url = 'https://platform.linkedin.com/in.js';
    if (!document.querySelector(`script[src='${url}']`)) {
      const script = document.createElement('script');
      script.src = url;
      script.innerHTML = ' lang: en_US';
      document.body.appendChild(script);
    }
  }

  ngOnInit(): void {
    // add linkedin share button script tag to element
    this.element.nativeElement.innerHTML = `<script type="IN/Share" data-url="${this.url}"></script>`;

    // render share button
    window['IN'] && window['IN'].parse();
  }

}
