import { Component, OnInit } from '@angular/core';
import {fadeAnimation} from '../../../shared/animations/animations';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  animations: [fadeAnimation]
})
export class AuthorizationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
