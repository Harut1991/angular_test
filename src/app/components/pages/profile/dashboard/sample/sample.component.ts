import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Attachment} from '../attachment.model';
import {SubmitSampleService} from '../../submit-sample-service/submit-sample.service';
import {MyToastrService} from '../../../../../services/my-toastr.service';
import {Router} from '@angular/router';
import {Status} from '../dashboard.component';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-sample, [app-sample]',
  templateUrl: './sample.component.html'
})
export class SampleComponent implements OnInit, AfterContentInit {
  @Input() sample: Attachment;
  @Input() priorities: Array<{ id: any, name: string }>;
  @Output() sampleDeleted: EventEmitter<{ id: any, sample_name: string }> = new EventEmitter();
  priority: string;
  issues_count: number;
  isDeleteButtonDisabled = false;

  constructor(private sampleService: SubmitSampleService,
              private toastr: MyToastrService,
              private sanitizer: DomSanitizer,
              private router: Router) {
  }

  ngOnInit() {
    this.issues_count = this.getIssuesCount();
    this.sampleService.$isSampleDeleted.subscribe(isDeleteButtonDisabled => {
      this.isDeleteButtonDisabled = isDeleteButtonDisabled;
    });
  }

  ngAfterContentInit(): void {
    this.priority = this.priorities.find(pr => pr.id === +this.sample.priority).name;
  }

  async downloadReview() {
    if (!this.sample.review_path) {
      this.toastr.error('Review not found!', 'Download File');
    } else {
      try {
        const blob = await this.sampleService.downloadReview(this.sample.review_path).catch(() =>
          this.toastr.error('Review not found!', 'Download File'));
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveOrOpenBlob(blob, this.sample.name + '.pdf');
        } else {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', this.sample.name + '.pdf');
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
        }
      } catch (error) {
      }
    }
  }

  isTooltipShown(elem: HTMLSpanElement): boolean {
    return elem.offsetWidth >= elem.scrollWidth;
  }

  deleteSample(id: any, name: string) {
    if (!this.isDeleteButtonDisabled) {
      this.sampleDeleted.emit({id: id, sample_name: name});
    }
  }

  editSample(id): void {
    this.router.navigate([`/edit-sample/${id}`]);
  }

  isSampleCompleted(status): boolean {
    return status === Status.FINISHED;
  }

  canEditSample(status): boolean {
    return status === Status.NOT_STARTED;
  }

  getIssuesCount(): number {
    return !(!this.sample.issues_count) ? this.sample.issues_count : 0;
  }

  getClass(status): string {
    switch (status) {
      case Status.NOT_STARTED:
        return 'to-do';
      case Status.IN_PROCESS:
        return 'in-review';
      case Status.FINISHED:
        return 'tertiary';
      case Status.DELETED:
        return 'deleted';
      default:
        return '';
    }
  }
}
