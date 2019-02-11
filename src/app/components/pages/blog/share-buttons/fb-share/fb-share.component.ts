import {AfterViewInit, Component, Input} from '@angular/core';

@Component({
  selector: 'app-fb-share, [app-fb-share]',
  template: `
    <div class="fb-share-button" [attr.data-href]="url" data-layout="button" data-action="like" size="small" data-mobile-iframe="false"
         data-show-faces="true" data-share="true"></div>`
})
export class FbShareComponent implements AfterViewInit {
  @Input() url = location.href;

  constructor() {
    // this.meta.updateTag()
    if (!window['fbAsyncInit']) {
      window['fbAsyncInit'] = function () {
        window['FB'].init({
          // appId: 'your_app_id',
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v3.0'
        });
      };
    }

    // load facebook sdk if required
    const url = 'https://connect.facebook.net/en_US/sdk.js';
    if (!document.querySelector(`script[src='${url}']`)) {
      const script = document.createElement('script');
      script.src = url;
      document.body.appendChild(script);
    }
  }

  ngAfterViewInit(): void {
    window['FB'] && window['FB'].XFBML.parse();
  }
}
