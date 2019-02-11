import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'dateFormat'})
export class DateFormat implements PipeTransform {
    transform(value: string): string {
        if (!value) {
            return '-';
        }
        const dd = new Date(value);
        return moment(dd).format('LL');
    }

}
