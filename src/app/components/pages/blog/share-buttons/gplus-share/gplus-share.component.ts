import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-gplus-share, [app-gplus-share]',
  template: `<div class="g-plus" data-action="share" data-annotation="bubble"></div>`
})
export class GplusShareComponent implements OnInit {
  @Input() url = location.href;

  constructor() {
    const po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/platform.js';
    const s = document.getElementsByTagName('script')[1]; s.parentNode.insertBefore(po, s);
  }

  share() {
    window.open('https://plus.google.com/share?url=' + encodeURIComponent(this.url),
      'google+-share-dialog',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
  }

  ngOnInit(): void {
  }

}
