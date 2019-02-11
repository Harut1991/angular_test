import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-blog-slider, [app-blog-slider]',
  templateUrl: './blog-slider.component.html',
})
export class BlogSliderComponent implements OnInit {
  @Input() header: string;
  @Input() blogPosts = [];

  constructor() {
  }

  ngOnInit() {
  }

}
