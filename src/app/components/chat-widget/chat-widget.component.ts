import {Component, OnInit} from '@angular/core';
import {WidgetService} from './widget.service';

declare const Tawk_API;

@Component({
  selector: 'app-chat-widget, [app-chat-widget]',
  templateUrl: './chat-widget.component.html'
})
export class ChatWidgetComponent implements OnInit {
  static isTawkMaximized = false;
  isTawkHidden = false;

  constructor(private widgetService: WidgetService) {
    this.widgetService.$hideWidget.subscribe(hidden => {
      this.isTawkHidden = hidden;
    });
  }

  ngOnInit() {
    if (document.body.scrollWidth < 518) {
      this.isTawkHidden = true;
    }
  }

  toggleTawkWidget(): void {
    Tawk_API.toggle();
    ChatWidgetComponent.isTawkMaximized = !ChatWidgetComponent.isTawkMaximized;
    this.widgetService.$widgetStatus.next(ChatWidgetComponent.isTawkMaximized);
  }

}
