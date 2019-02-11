import { TestBed, inject } from '@angular/core/testing';

import { ResolveFinishedSamplesService } from './resolve-finished-samples.service';

describe('ResolveFinishedSamplesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveFinishedSamplesService]
    });
  });

  it('should be created', inject([ResolveFinishedSamplesService], (service: ResolveFinishedSamplesService) => {
    expect(service).toBeTruthy();
  }));
});
