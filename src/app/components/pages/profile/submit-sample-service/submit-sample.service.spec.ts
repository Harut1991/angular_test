import { TestBed, inject } from '@angular/core/testing';

import { SubmitSampleService } from './submit-sample.service';

describe('SubmitSampleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubmitSampleService]
    });
  });

  it('should be created', inject([SubmitSampleService], (service: SubmitSampleService) => {
    expect(service).toBeTruthy();
  }));
});
