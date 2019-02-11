import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FaqService} from './faq.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Faq} from './faq.model';
import {RouterLoaderService} from '../../header/router-loader/router-loader.service';
import {ResponseModel} from '../../../shared/models/response-model';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-faq, [app-faq]',
  templateUrl: './faq.component.html',
  providers: [FaqService]
})
export class FaqComponent implements OnInit {
  questions: any;
  page = 1;
  totalItems: number;
  popupAnswer: string;
  popupQuestion: string;
  searchQuery = '';
  limit = 6;

  constructor(private faqService: FaqService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private routerLoaderService: RouterLoaderService) {
  }

  ngOnInit() {
    this.activatedRoute.data
      .subscribe((data: { faqs: any }) => {
        this.initDataAfterResolve(data.faqs);
      }).unsubscribe();
  }

  initQueryParams(): void {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    if (queryParams.hasOwnProperty('search_param')) {
      this.searchQuery = queryParams['search_param'];
    }
    if (queryParams.hasOwnProperty('page')) {
      this.page = +queryParams['page'];
      this.page = Math.ceil(this.totalItems / this.limit) < this.page ? 1 : this.page;
    }
    this.subscribeToRouterParams();
  }

  private initDataAfterResolve(data): void {
    if (data) {
      data.subscribe(res => {
        this.totalItems = res.body.count;
        this.questions = res.body.results;
        this.initQueryParams();
      });
    } else {
      this.questions = [];
      return;
    }
  }

  changePage(event): void {
    if (this.searchQuery !== '') {
      this.searchFaq(event);
    } else {
      this.faqService.getQuestions<ResponseModel<Faq>>(`?page=${event}`, this.limit).subscribe(response => {
        this.initDataAfterPageChange(event, response);
      }, error => {
        if (error.status !== 401) {
          this.changePage(1);
        } else if (error.status === 0) {
          // this.authService.logOut();
        }
      });
    }
  }

  isReadMoreHidden(elem: HTMLSpanElement, answer): boolean {
    return elem.innerHTML.length === answer.length;
  }

  private initDataAfterPageChange(page, response) {
    this.page = page;
    this.totalItems = response.body.count;
    this.questions = response.body.results;
    this.routerLoaderService.$loader.next(false);
  }

  searchFaq(page = 1): void {
    this.faqService.getQuestions<ResponseModel<Faq>>(`?search_param=${this.searchQuery}&page=${page}`, this.limit).subscribe((response) => {
      this.changeQueryParams();
      this.initDataAfterPageChange(page, response);
    }, error => {
      if (error.status !== 401) {
        this.changePage(1);
      } else {
        // this.authService.logOut();
      }
    });
  }

  initPopupText(index: number): void {
    this.popupAnswer = this.questions[index].answer;
    this.popupQuestion = this.questions[index].question;
  }

  changeQueryParams(page = 1): void {
    this.routerLoaderService.$loader.next(true);
    if (this.searchQuery !== '') {
      this.router.navigate(['/faq'], {
        queryParams: {search_param: `${this.searchQuery}`, page: `${page}`},
        queryParamsHandling: 'merge'
      });
    } else {
      this.router.navigate(['/faq'], {queryParams: {page: `${page}`}});
    }
  }

  private subscribeToRouterParams(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let page = 1;
      let searchQuery = '';
      if (params.hasOwnProperty('page')) {
        page = +params.page === 0 ? 1 : +params.page;
        if (params.hasOwnProperty('search_param')) {
          searchQuery = params['search_param'];
        }
        if (this.page !== page || this.searchQuery !== searchQuery) {
          this.routerLoaderService.$loader.next(true);
          this.searchQuery = searchQuery;
          this.changePage(page);
        }
      }
    });
  }

}
