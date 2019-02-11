import {Component} from '@angular/core';
import {ContactUs} from '../../../shared/contac-us/contact-us';
import {FormBuilder} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication-service/authentication.service';
import {MyToastrService} from '../../../services/my-toastr.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html'
})
export class ContactUsComponent extends ContactUs {

  constructor(private fb: FormBuilder, private authS: AuthenticationService, private toastr: MyToastrService) {
    super(fb, authS, toastr);
  }

}
