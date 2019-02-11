import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyFormat'
})
export class EmptyFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return !(!value) ? value : '-';
  }

}
