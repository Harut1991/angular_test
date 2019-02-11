import { TestBed, inject } from '@angular/core/testing';

import { ResolveFaqService } from './resolve-faq.service';

describe('ResolveFaqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveFaqService]
    });
  });

  it('should be created', inject([ResolveFaqService], (service: ResolveFaqService) => {
    expect(service).toBeTruthy();
  }));
});
