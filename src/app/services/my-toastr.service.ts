import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MyToastrService {

  constructor(private toastr: ToastrService) { }

  success(message: string, title: string, timing = 10000, closeButton = false, disableTimeOut = false): void {
    if (disableTimeOut) {

      this.toastr.success(message, title, {
        disableTimeOut: disableTimeOut,
        closeButton: closeButton
      });
    } else {
      this.toastr.success(message, title, {
        timeOut: timing,
      });
    }
  }

  error(message = 'Please try again.', title = 'Something went wrong!'): void {
    this.toastr.error(message, title,  {
      disableTimeOut: true,
      closeButton: true
    });
  }
}
