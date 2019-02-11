import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication-service/authentication.service';
import {slickItems} from './slick-items';
import {BlogService} from '../blog/blog.service';
import {ResponseModel} from '../../../shared/models/response-model';
import {Article} from '../blog/article.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {urlRegexp} from '../profile/submit-sample/submit-form.config';
import {ScanningService} from '../scanning/scanning.service';
import {ScanType, ToolId, validationMessages} from '../scanning/scanning.config';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home, [app-home]',
  templateUrl: './home.component.html',
  providers: [BlogService]
})
export class HomeComponent implements OnInit {
  slickItems: Array<{reviewerName: string, date: string, review: string}>;
  blogPosts: Array<Article> = [];
  scanForm: FormGroup;
  errorMessages;

  constructor(private authService: AuthenticationService,
              private blogService: BlogService,
              private router: Router,
              private scanService: ScanningService,
              private fb: FormBuilder) {
    this.slickItems = slickItems;
    this.errorMessages = validationMessages;
  }

  ngOnInit() {
    this.blogService.getPosts<ResponseModel<Article>>('?page=1', 12).subscribe(res => {
      this.blogPosts = res.body.results;
    });
    this.scanForm = this.fb.group({
      domain: [null, Validators.pattern(urlRegexp)]
    });
  }

  scan(formValue) {
    if (this.scanForm.valid && formValue.domain && !formValue.domain.includes('kodeist')) {
      this.scanService.startScanning(ToolId.WEB_SERVER_SCAN, ScanType.QUICK, formValue.domain).subscribe(res => {
        if (res['op_status'] === 'fail') {
          this.scanForm.get('domain').setErrors({fail: true});
          this.errorMessages[this.errorMessages.length - 1].message = res['details'];
        } else {
          this.router.navigate([`/scanning`], {queryParams: {scan_id: res['scan_id'], domain: formValue.domain}});
        }
      });
    } else if (formValue.domain && formValue.domain.includes('kodeist')) {
        this.errorMessages[this.errorMessages.length - 1].message = 'Please try another url';
        this.scanForm.get('domain').setErrors({fail: true});
    }
  }

  get getStartedUrl(): string {
    if (this.authService.isLoggedIn()) {
      return '/submit-sample';
    } else {
      return '/sign-up';
    }
  }
}
