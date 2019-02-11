import {Component, OnDestroy, OnInit} from '@angular/core';
import {fadeAnimation} from '../../../shared/animations/animations';
import {SubmitSampleService} from './submit-sample-service/submit-sample.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  animations: [fadeAnimation]
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(private sampleService: SubmitSampleService) { }

  ngOnInit() {
    this.sampleService.$isSampleDeleted = new Subject();
  }

  ngOnDestroy(): void {
    this.sampleService.$isSampleDeleted.unsubscribe();
  }

}
