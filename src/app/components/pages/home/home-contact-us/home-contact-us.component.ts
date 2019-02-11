import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AuthenticationService} from '../../../../services/authentication-service/authentication.service';
import {ContactUs} from '../../../../shared/contac-us/contact-us';
import {MyToastrService} from '../../../../services/my-toastr.service';

@Component({
  selector: 'app-home-contact-us, [app-home-contact-us]',
  templateUrl: './home-contact-us.component.html'
})
export class HomeContactUsComponent extends ContactUs {

  constructor(private fb: FormBuilder, private authS: AuthenticationService, private toastr: MyToastrService) {
    super(fb, authS, toastr);
  }

}
