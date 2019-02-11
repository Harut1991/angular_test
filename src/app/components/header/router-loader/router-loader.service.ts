import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterLoaderService {
  $loader: Subject<boolean | {loader: boolean}>;

  constructor() {
    this.$loader = new Subject<boolean | {loader: boolean}>();
  }
}
