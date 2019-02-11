import { TestBed, inject } from '@angular/core/testing';

import { ResolveEditSampleDataService } from './resolve-edit-sample-data.service';

describe('ResolveEditSampleDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveEditSampleDataService]
    });
  });

  it('should be created', inject([ResolveEditSampleDataService], (service: ResolveEditSampleDataService) => {
    expect(service).toBeTruthy();
  }));
});
