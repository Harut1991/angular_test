import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SubmitSampleService} from '../../components/pages/profile/submit-sample-service/submit-sample.service';
import {HttpEventType} from '@angular/common/http';
import {MyToastrService} from '../../services/my-toastr.service';
import {WidgetService} from '../../components/chat-widget/widget.service';
import {ChatWidgetComponent} from '../../components/chat-widget/chat-widget.component';
import {CancellationPopupComponent} from '../../components/cancelation-popup/cancellation-popup.component';

declare const Tawk_API;
declare const $;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  providers: [SubmitSampleService]
})
export class UploadComponent implements OnInit, AfterViewInit {
  static samples: Array<{ sampleName: string; uploadProgress: string; sampleId: any; error: boolean; subscription: any }> = [];
  static uploadInProgress = [];
  private static isTawkHidden = false;
  @ViewChild(CancellationPopupComponent) cancellationPopup: CancellationPopupComponent;
  private isUploaderMinimized = false;

  constructor(private submitSampleService: SubmitSampleService, private toastr: MyToastrService, private widgetService: WidgetService) {
    window.onbeforeunload = (ev) => {
      if (!(!this.getUploadingSamples())) {
        (ev || window.event).returnValue = 'Your upload(s) is not complete!';
        return 'Your upload(s) is not complete!';
      }
    };
  }

  ngOnInit() {
    this.widgetService.$widgetStatus.subscribe(status => {
      if (UploadComponent.samples.length !== 0 && !this.isUploaderMinimized) {
        document.getElementById('minimize-button').classList.add('rotate');
        document.getElementById('progress-bar').classList.add('open');
        this.isUploaderMinimized = true;
      }
    });
  }

  onWindowResize() {
    if (document.body.scrollWidth < 516 && !UploadComponent.isTawkHidden) {
      Tawk_API.hideWidget();
      UploadComponent.isTawkHidden = true;
      this.widgetService.$hideWidget.next(true);
    } else if (document.body.scrollWidth >= 516 && UploadComponent.isTawkHidden) {
      Tawk_API.showWidget();
      UploadComponent.isTawkHidden = false;
      this.widgetService.$hideWidget.next(false);
    }
  }

  ngAfterViewInit(): void {
    $(document).ready(function(){
      if (Tawk_API) {
        Tawk_API.onLoad = function() {
          Tawk_API.maximize();
        };
      }
    });
  }

  upload(sampleData, editMode, id) {
    this.hideTawk();
    const sample = {
      sampleName: sampleData.name,
      uploadProgress: '0',
      sampleId: sampleData.name,
      error: false,
      subscription: null
    };
    UploadComponent.samples.push(sample);
    if (editMode) {
      this.makeRequest(() => this.submitSampleService.updateAttachment(id, sampleData), sample);
    } else {
      this.makeRequest(() => this.submitSampleService.submitSample(sampleData), sample);
    }
  }

  makeRequest(requestCallback, sample) {
    this.minimizeWidgetOnUpload();
    setTimeout(() => {
      let percentDone = 0;
      UploadComponent.uploadInProgress.push(0);
      sample.subscription = requestCallback().subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          percentDone = Math.round(100 * event.loaded / event.total);
          sample.uploadProgress = percentDone + '%';
        }
        if (event.type === HttpEventType.Response && percentDone === 100) {
          this.closeUploader(true);
        }
      }, error1 => {
        sample.error = true;
        if (error1.status === 0) {
          this.toastr.error('Internet connection refused!', 'Error!');
        } else if (error1.error.hasOwnProperty('file_set')) {
          this.toastr.error(error1.error['file_set'][0]['file'][0], 'File validation error!');
        } else {
          this.toastr.error();
        }
      });
    });
  }

  get getStaticArray() {
    return UploadComponent.samples;
  }

  closeSingleProgress(index: number) {
    if (UploadComponent.samples[index].uploadProgress !== '100%' && !UploadComponent.samples[index].error) {
      this.toastr.error(`Uploading a sample "${UploadComponent.samples[index].sampleName}" canceled!`, 'Submit Sample');
    }
    UploadComponent.samples[index].subscription.unsubscribe();
    UploadComponent.samples.splice(index, 1);
    if (UploadComponent.samples.length === 0) {
      this.showTawk();
    }
  }

  closeUploader(timeout = false): void {
    const uploadingSample = this.getUploadingSamples();
    if (!(!uploadingSample)) {
      this.cancellationPopup.openPopup();
    } else {
      if (timeout) {
         setTimeout(() => {
           this.unsubscribeAndShowTawk();
         }, 10000);
      } else {
        this.unsubscribeAndShowTawk();
      }
    }
  }

  unsubscribeAndShowTawk() {
    UploadComponent.uploadInProgress.pop();
    if (UploadComponent.uploadInProgress.length === 0) {
      UploadComponent.samples.forEach(sample => {
        sample.subscription.unsubscribe();
      });
      UploadComponent.samples.length = 0;
      this.showTawk();
    }
  }

  continueUpload = () => {
    $.magnificPopup.close();
  };

  minimizeWidgetOnUpload() {
    Tawk_API.minimize();
    this.isUploaderMinimized = true;
    ChatWidgetComponent.isTawkMaximized = false;
  }

  cancelUpload = (showTastr = true) => {
    UploadComponent.samples.forEach(sample => {
      sample.subscription.unsubscribe();
    });
    UploadComponent.samples.length = 0;
    $.magnificPopup.close();
    this.showTawk();
    if (showTastr) {
      this.toastr.error('Uploading sample(s) canceled!', 'Submit Sample');
    }
  };

  minimizeUploader(minimize: HTMLElement, progressBar: HTMLElement) {
    minimize.classList.toggle('rotate');
    progressBar.classList.toggle('open');
    this.isUploaderMinimized = !this.isUploaderMinimized;
    Tawk_API.minimize();
    ChatWidgetComponent.isTawkMaximized = false;
  }

  private showTawk() {
    if (document.body.scrollWidth < 516) {
      if (UploadComponent.isTawkHidden) {
        Tawk_API.showWidget();
        UploadComponent.isTawkHidden = false;
        this.widgetService.$hideWidget.next(false);
      }
    }
  }

  private hideTawk() {
    if (document.body.scrollWidth < 516) {
      if (!UploadComponent.isTawkHidden) {
        Tawk_API.hideWidget();
        UploadComponent.isTawkHidden = true;
        this.widgetService.$hideWidget.next(true);
      }
    }
  }

  getUploadingSamples() {
    return UploadComponent.samples.find(sample => sample.uploadProgress !== '100%' && !sample.error);
  }
}
