import { TestBed, inject } from '@angular/core/testing';

import { MyToastrService } from './my-toastr.service';

describe('MyToastrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyToastrService]
    });
  });

  it('should be created', inject([MyToastrService], (service: MyToastrService) => {
    expect(service).toBeTruthy();
  }));
});
