import { Pipe, PipeTransform } from '@angular/core';
import {Status} from '../components/pages/profile/dashboard/dashboard.component';

@Pipe({name: 'status'})
export class StatusPipe implements PipeTransform {
  transform(value: string): string {
      switch (value) {
        case Status.NOT_STARTED:
          return 'Pending';
        case Status.IN_PROCESS:
          return 'On review';
        case Status.FINISHED:
          return 'Complete';
        case Status.DELETED:
          return 'Deleted';
        default: return '-';
      }
  }

}
