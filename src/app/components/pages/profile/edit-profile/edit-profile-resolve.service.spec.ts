import { TestBed, inject } from '@angular/core/testing';

import { EditProfileResolveService } from './edit-profile-resolve.service';

describe('EditProfileResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditProfileResolveService]
    });
  });

  it('should be created', inject([EditProfileResolveService], (service: EditProfileResolveService) => {
    expect(service).toBeTruthy();
  }));
});
