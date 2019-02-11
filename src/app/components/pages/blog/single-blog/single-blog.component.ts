import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogService} from '../blog.service';
import {ActivatedRoute} from '@angular/router';
import {Article} from '../article.model';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html'
})
export class SingleBlogComponent implements OnInit, OnDestroy {
  relatedArticles: Array<Article> = [];
  article: Article;
  location = location.href;

  constructor(private blogService: BlogService, private activatedRoute: ActivatedRoute, private meta: Meta) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { article: any, relatedArticles: any }) => {
      this.initArticle(data.article);
    });
  }

  initArticle(data) {
    data.subscribe(res => {
      this.article = res.body;
      this.relatedArticles = res.body.related_articles;
      this.meta.addTag(
        { name: 'twitter:card', content: 'summary_large_image' }
      );
      this.meta.addTag(
        { name: 'twitter:site', content: '@kodeist' }
      );
      this.meta.addTag(
        { name: 'twitter:creator', content: '@kodeist' }
      );
      this.meta.addTag(
        { name: 'twitter:title', content: this.article.title }
      );
      this.meta.addTag(
        { name: 'twitter:description', content: this.article.description }
      );
      this.meta.addTag(
        { name: 'twitter:image', content: this.article.image }
      );
      this.meta.addTag(
        { name: 'twitter:image:alt', content: this.article.title }
      );
      this.meta.updateTag({property: 'og:url', content: location.href});
      this.meta.updateTag({property: 'og:title', content: this.article.title});
      this.meta.updateTag({property: 'og:description', content: this.article.description});
      this.meta.updateTag({property: 'og:image', content: this.article.image});
      this.meta.updateTag({property: 'og:image:width', content: '1200'});
      this.meta.updateTag({property: 'og:image:height', content: '700'});
    });
  }

  ngOnDestroy(): void {
    // this.meta.removeTag('twitter:card');
    this.meta.updateTag({property: 'og:url', content: ''});
    this.meta.updateTag({property: 'og:title', content: ''});
    this.meta.updateTag({property: 'og:description', content: ''});
    this.meta.updateTag({property: 'og:image', content: ''});
    this.meta.updateTag({property: 'og:image:width', content: ''});
    this.meta.updateTag({property: 'og:image:height', content: ''});
  }

}
