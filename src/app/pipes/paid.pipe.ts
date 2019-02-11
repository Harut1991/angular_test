import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paid'
})
export class PaidPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value ? 'Paid' : 'Not paid';
  }

}
