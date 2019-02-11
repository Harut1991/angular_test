import { TestBed, inject } from '@angular/core/testing';

import { ResolveAttachmentsService } from './resolve-attachments.service';

describe('ResolveAttachmentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveAttachmentsService]
    });
  });

  it('should be created', inject([ResolveAttachmentsService], (service: ResolveAttachmentsService) => {
    expect(service).toBeTruthy();
  }));
});
