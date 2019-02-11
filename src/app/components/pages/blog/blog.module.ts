import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlogSliderModule} from '../../../shared/shared-modules/blog-slider.module';
import {SingleBlogComponent} from './single-blog/single-blog.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared-modules/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {BlogComponent} from './blog.component';
import { BlogPostsComponent } from './blog-posts/blog-posts.component';
import {BlogService} from './blog.service';
import {ResolveArticleService} from './single-blog/resolve-article.service';
import {ResolvePostsService} from './blog-posts/resolve-posts.service';
import { FbShareComponent } from './share-buttons/fb-share/fb-share.component';
import { TwitterShareComponent } from './share-buttons/twitter-share/twitter-share.component';
import { GplusShareComponent } from './share-buttons/gplus-share/gplus-share.component';
import { LinkedInShareComponent } from './share-buttons/linked-in-share/linked-in-share.component';

const routes: Routes = [
  {path: '', component: BlogComponent, children: [
      {
        path: 'posts',
        component: BlogPostsComponent,
        resolve: {posts: ResolvePostsService},
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      },
      {
        path: 'post/:id',
        component: SingleBlogComponent,
        resolve: {article: ResolveArticleService}
      },
      {path: '', redirectTo: '/blog/posts', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  declarations: [
    SingleBlogComponent,
    BlogComponent,
    BlogPostsComponent,
    FbShareComponent,
    TwitterShareComponent,
    GplusShareComponent,
    LinkedInShareComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BlogSliderModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    BlogService,
    ResolveArticleService,
    ResolvePostsService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class BlogModule {
}
