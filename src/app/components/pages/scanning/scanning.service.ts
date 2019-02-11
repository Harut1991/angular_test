import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BaseHttpService} from '../../../services/base-http-service.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScanningService {
  private PENTEST_URL = 'https://pentest-tools.com/api?key=';
  private KEY = '06be8dca3da86b7d574da435896b231660085450';

  constructor(private httpClient: HttpClient) {
  }

  startScanning(tool_id: number, scan_type: string, target: string) {
    return this.httpClient.post(this.PENTEST_URL + this.KEY, {
      op: 'start_scan',
      tool_id: tool_id,
      tool_params: {
        target: target,
        scan_type: scan_type
      }
    });
  }

  getScanResponse(scan_id: any): any {
    return this.httpClient.post(this.PENTEST_URL + this.KEY, {
      op: 'get_output',
      output_format: 'html',
      scan_id: scan_id
    }, {reportProgress: true, observe: 'events'});
  }

}
