import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  $widgetStatus: Subject<boolean> = new Subject();
  $hideWidget: Subject<boolean> = new Subject();

  constructor() { }
}
