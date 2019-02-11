import {Component, OnInit} from '@angular/core';
import {fadeAnimation} from '../../../shared/animations/animations';

@Component({
  selector: 'app-blog, [app-blog]',
  templateUrl: './blog.component.html',
  animations: [fadeAnimation]
})
export class BlogComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
