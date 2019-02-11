import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
declare const $;

@Component({
  selector: 'app-cancellation-popup',
  templateUrl: './cancellation-popup.component.html'
})
export class CancellationPopupComponent implements OnInit, AfterViewInit {
  @Input() continueUpload;
  @Input() cancelUpload;
  @Input() id: string;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.cancelUpload) {
      this.cancelUploading = this.cancelUpload;
    }
    if (this.continueUpload) {
      this.continueUploading = this.continueUpload;
    }
  }

  openPopup(): void {
    if ($(`#${this.id}`).length) {
      $.magnificPopup.open({
        items: {
          src: $(`#${this.id}`)
        },
        type: 'inline'
      });
    }
  }

  cancelUploading() {}

  continueUploading() {}
}
