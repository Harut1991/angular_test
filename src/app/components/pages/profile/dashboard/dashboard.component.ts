import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ResponseModel} from '../../../../shared/models/response-model';
import {Attachment} from './attachment.model';
import {RouterLoaderService} from '../../../header/router-loader/router-loader.service';
import {SubmitSampleService} from '../submit-sample-service/submit-sample.service';
import {MyToastrService} from '../../../../services/my-toastr.service';

export enum Status {
  DELETED = 'deleted',
  FINISHED = 'finished',
  IN_PROCESS = 'in_process',
  NOT_STARTED = 'not_started',
}
declare const $;

@Component({
  selector: 'app-dashboard, [app-dashboard]',
  templateUrl: './dashboard.component.html',
  providers: [UserService]
})
export class DashboardComponent implements OnInit {
  date = new Date();
  page = 1;
  totalItems: number;
  limit = 12;
  status: string;
  samples: Array<Attachment> = [];
  priorities;
  private sampleIDForDelete: any;
  sampleNameForDelete: string;

  constructor(private sampleService: SubmitSampleService,
              private router: Router,
              private toastr: MyToastrService,
              private activatedRoute: ActivatedRoute,
              private routerLoaderService: RouterLoaderService) {
  }

  ngOnInit() {
    this.activatedRoute.data
      .subscribe((data: { attachments: { attachments: Array<Attachment>, priorities: any } }) => {
        this.initPriorities(data.attachments.priorities);
        this.initAttachments(data.attachments.attachments);
      }).unsubscribe();
    this.initQueryParams();
  }

  private initQueryParams(): void {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    let status;
    if (queryParams.hasOwnProperty('status')) {
      status = queryParams['status'];
      if (!DashboardComponent.checkStatus(status)) {
        status = Status.NOT_STARTED;
      }
    } else {
      status = Status.NOT_STARTED;
    }
    this.status = status;
    if (queryParams.hasOwnProperty('page')) {
      this.page = +queryParams['page'];
    }
    this.subscribeToRouterQueryParams();
  }

  private subscribeToRouterQueryParams(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let status = Status.NOT_STARTED;
      let page = 1;
      if (params.hasOwnProperty('page')) {
        page = +params.page === 0 ? 1 : +params.page;
        if (params.hasOwnProperty('status') && params['status']) {
          status = params['status'];
          if (!DashboardComponent.checkStatus(status)) {
            status = Status.NOT_STARTED;
          }
        }
      }
      if (this.page !== page || this.status !== status) {
        this.routerLoaderService.$loader.next(true);
        this.status = status;
        this.changePage(page);
      }
    });
  }

  private initAttachments(data) {
    data.subscribe(res => {
      this.totalItems = res.body.count;
      this.samples = res.body.results;
    });
  }

  private initPriorities(data): void {
    if (data) {
      data.subscribe(res => {
        const priorityOptions = [];
        res.body.forEach(data1 => {
          if (data1.hasOwnProperty('PRIORITY_CHOICES')) {
            data1.PRIORITY_CHOICES.forEach((pr) => {
              Object.keys(pr).forEach(key => {
                priorityOptions.push({
                  name: pr[key],
                  id: +key
                });
              });
            });
          }
        });
        this.priorities = [...priorityOptions];
      });
    } else {
      this.priorities = [];
      return;
    }
  }

  updateSamples(data: {id: any, sample_name: string}): void {
    this.sampleIDForDelete = data.id;
    this.sampleNameForDelete = data.sample_name;
    if ($(`#delete-sample-submition`).length) {
      $.magnificPopup.open({
        items: {
          src: $(`#delete-sample-submition`)
        },
        type: 'inline'
      });
    }
  }

  deleteSample(): void {
    $.magnificPopup.close();
    this.sampleService.$isSampleDeleted.next(true);
    this.sampleService.deleteAttachment(this.sampleIDForDelete).subscribe(res => {
      this.toastr.success('Sample deleted successfully', 'Sample');
      if ((this.page - 1) >= (this.totalItems - 1) / this.limit && this.totalItems !== 1) {
        this.changePage(this.page - 1);
      } else {
        this.changePage(this.page);
      }
    }, error1 => {
      this.sampleService.$isSampleDeleted.next(false);
      this.toastr.error();
    });
  }

  cancelDelete(): void {
    this.sampleService.$isSampleDeleted.next(false);
    $.magnificPopup.close();
  }

  changePage(event): void {
    if (this.status !== '') {
      this.getAttachments(`?status=${this.status}&page=${event}`, event);
    }
  }

  goToPendingReviews(): void {
    this.changeQueryParams(1, Status.NOT_STARTED);
  }

  goToCompletedReviews(): void {
    this.changeQueryParams(1, Status.FINISHED);
  }

  goToCodesInReviews(): void {
    this.changeQueryParams(1, Status.IN_PROCESS);
  }

  private getAttachments(query, page): void {
    this.sampleService.getAttachments<ResponseModel<Attachment>>(query, this.limit).subscribe(
      res => {
        this.totalItems = res.body.count;
        this.samples = res.body.results;
        this.page = page;
        this.routerLoaderService.$loader.next(false);
      });
  }

  private changeQueryParams(page = 1, status): void {
    this.router.navigate(['/dashboard'], {
      queryParams: {status: `${status}`, page: `${page}`},
      queryParamsHandling: 'merge', preserveQueryParams: true
    });
  }

  static checkStatus(status: string): boolean {
    switch (status) {
      case Status.NOT_STARTED:
        return true;
      case Status.IN_PROCESS:
        return true;
      case Status.FINISHED:
        return true;
      case Status.DELETED:
        return true;
      default:
        return false;
    }
  }
}
