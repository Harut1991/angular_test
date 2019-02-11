import { TestBed, inject } from '@angular/core/testing';

import { FaqService } from './faq.service';

describe('ScanningService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaqService]
    });
  });

  it('should be created', inject([FaqService], (service: FaqService) => {
    expect(service).toBeTruthy();
  }));
});
