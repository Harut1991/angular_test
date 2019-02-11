import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpEventType} from '@angular/common/http';
import {MyToastrService} from '../../../services/my-toastr.service';
import {urlRegexp} from '../profile/submit-sample/submit-form.config';
import {takeWhile} from 'rxjs/operators';
import {ScanType, ToolId} from './scanning.config';
import {ScanningService} from './scanning.service';

@Component({
  selector: 'app-scanning, [app-scanning]',
  templateUrl: './scanning.component.html'
})
export class ScanningComponent implements OnInit, OnDestroy {
  weServerScanHtml = '';
  xssScanHtml = '';
  sqliScanHtml = '';
  domain = '';
  XssScanId;
  SqliScanId;
  runRecursiveFunctions = true;
  constructor(private activatedRoute: ActivatedRoute,
              private scanningService: ScanningService,
              private router: Router,
              private toastr: MyToastrService) {
  }

  ngOnDestroy(): void { this.runRecursiveFunctions = false; }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (!params.hasOwnProperty('scan_id') || !params.hasOwnProperty('domain')) {
        this.showErrorAndRedirect();
      } else {
        this.domain = params['domain'];
        if (!urlRegexp.test(this.domain)) {
          this.showErrorAndRedirect();
        } else {
          this.startScanResponse(params);
          this.startXssScan();
          this.startSqliScan();
        }
      }
    });
  }

  private  findRowElements(strHtml: string): string {
    const documentFragment = document.createElement('div');
    documentFragment.innerHTML = strHtml;
    const resultArea = Array.from(documentFragment.querySelector('.result-area').children);
    const div = document.createElement('div');
    resultArea.filter(item => item instanceof HTMLDivElement).
    forEach(res => div.appendChild(res));
    return div.innerHTML;
  }

  startScanResponse(params: any) {
    this.scanningService.getScanResponse(+params['scan_id']).pipe(takeWhile(res => res['scan_status'] !== 'finished')).subscribe(event => {
      if (event.type === HttpEventType.Response) {
        if (event.body.hasOwnProperty('error')) {
          this.showErrorAndRedirect();
        }
        if (event.body['scan_status'] === 'finished') {
          this.getXssScanResponse();
          this.weServerScanHtml = this.findRowElements(/<body.*?>([\s\S]*)<\/body>/.exec(event.body.scan_output.output_html)[1]);
        } else if (this.runRecursiveFunctions) {
          setTimeout(() => {
            this.startScanResponse(params);
          }, 3000);
        }
      }
    });
  }

  getXssScanResponse(repeat = true) {
    this.scanningService.getScanResponse(+this.XssScanId).pipe(
      takeWhile(response => response['scan_status'] !== 'finished')).subscribe(event => {
      if (event.type === HttpEventType.Response) {
        if (event.body.hasOwnProperty('error')) {
          this.showErrorAndRedirect();
        }
        if (event.body['scan_status'] === 'finished') {
          this.getStartSqliScanResponse();
          this.xssScanHtml = this.findRowElements(/<body.*?>([\s\S]*)<\/body>/.exec(event.body.scan_output.output_html)[1]);
        } else if (repeat && this.runRecursiveFunctions) {
          setTimeout(() => {
            this.getXssScanResponse();
          }, 3000);
        }
      }
    });
  }

  startXssScan() {
    this.scanningService.startScanning(ToolId.XSS_SCAN, ScanType.LIGHT, this.domain).subscribe(res => {
      if (res['op_status'] === 'fail') {
      } else {
          this.XssScanId = res['scan_id'];
          this.getXssScanResponse(false);
      }
    });
  }

  startSqliScan() {
    this.scanningService.startScanning(ToolId.SQLI_SCAN, ScanType.LIGHT, this.domain).subscribe(res => {
      if (res['op_status'] === 'fail') {
      } else {
        this.SqliScanId = res['scan_id'];
        this.getStartSqliScanResponse(false);
      }
    });
  }

  getStartSqliScanResponse(repeat = true) {
    this.scanningService.getScanResponse(+this.SqliScanId).pipe(
      takeWhile(response => response['scan_status'] !== 'finished')).subscribe(event => {
      if (event.type === HttpEventType.Response) {
        if (event.body.hasOwnProperty('error')) {
          this.showErrorAndRedirect();
        }
        if (event.body['scan_status'] === 'finished') {
          this.sqliScanHtml = this.findRowElements(/<body.*?>([\s\S]*)<\/body>/.exec(event.body.scan_output.output_html)[1]);
        } else if (repeat && this.runRecursiveFunctions) {
          setTimeout(() => {
            this.getStartSqliScanResponse();
          }, 3000);
        }
      }
    });
  }

  showErrorAndRedirect() {
    this.router.navigate(['']).then(() => {
      this.toastr.error('Please provide your website domain and try again', 'Check your website security!');
    });
  }

}
