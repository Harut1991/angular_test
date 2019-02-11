import {Component, OnInit} from '@angular/core';
import {BlogService} from '../blog.service';
import {Article} from '../article.model';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterLoaderService} from '../../../header/router-loader/router-loader.service';
import {ResponseModel} from '../../../../shared/models/response-model';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  providers: [BlogService]
})
export class BlogPostsComponent implements OnInit {
  page: number;
  limit: number;
  totalItems: number;
  blogPosts: Array<Article> = [];

  constructor(private blogService: BlogService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private routerLoaderService: RouterLoaderService) {
    this.page = 1;
    this.limit = 6;
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { posts: any }) => {
      this.initDataAfterResolve(data.posts);
    }).unsubscribe();
  }

  initDataAfterResolve(data) {
    data.subscribe(res => {
      this.totalItems = res.body.count;
      this.blogPosts = res.body.results;
      this.initQueryParams();
    });
  }

  initQueryParams(): void {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    if (queryParams.hasOwnProperty('page')) {
      this.page = +queryParams['page'];
      this.page = Math.ceil(this.totalItems / this.limit) < this.page ? 1 : this.page;
    }
    this.subscribeToRouterParams();
  }

  changeQueryParams(page = 1): void {
    this.routerLoaderService.$loader.next(true);
    this.router.navigate(['/blog/posts'], {queryParams: {page: `${page}`}});
  }

  private subscribeToRouterParams(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let page = 1;
      if (params.hasOwnProperty('page')) {
        page = +params.page === 0 ? 1 : +params.page;
        if (this.page !== page) {
          this.routerLoaderService.$loader.next(true);
          this.changePage(page);
        }
      }
    });
  }

  private initDataAfterPageChange(page, response) {
    this.page = page;
    this.totalItems = response.body.count;
    this.blogPosts = response.body.results;
    this.routerLoaderService.$loader.next(false);
  }

  changePage(event): void {
    this.blogService.getPosts<ResponseModel<Article>>(`?page=${event}`, this.limit).subscribe(response => {
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
