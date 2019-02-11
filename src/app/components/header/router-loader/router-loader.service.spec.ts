import { TestBed, inject } from '@angular/core/testing';

import { RouterLoaderService } from './router-loader.service';

describe('RouterLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterLoaderService]
    });
  });

  it('should be created', inject([RouterLoaderService], (service: RouterLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
