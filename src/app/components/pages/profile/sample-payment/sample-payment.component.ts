import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Attachment} from '../dashboard/attachment.model';
import SimpleBar from 'simplebar';
import {UserService} from '../user.service';

@Component({
  selector: 'app-sample-payment, [sample-payment]',
  templateUrl: './sample-payment.component.html'
})
export class SamplePaymentComponent implements OnInit, AfterViewInit {
  samples: Array<Attachment> = [];
  private simpleBar: SimpleBar;
  totalAmount = '0.00';
  checkBoxes = {};
  sampleIdsToPay: Array<any> = [];

  constructor(private activatedRout: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.activatedRout.data.subscribe((data: {samples: any}) => {
      if (data.samples) {
        data.samples.subscribe(res => {
          res.body.results.forEach(sample => {
            this.checkBoxes[sample.id] = false;
          });
          this.samples = [...res.body.results];
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.initScrollBar();
  }

  countPrice(index: number, id: any) {
    if (this.checkBoxes[id]) {
      this.totalAmount = (parseFloat(this.totalAmount ) + parseFloat(this.samples[index].price)).toFixed(2);
      this.sampleIdsToPay.push(id);
    } else {
      this.totalAmount = (parseFloat(this.totalAmount ) - parseFloat(this.samples[index].price)).toFixed(2);
      /*const i = this.sampleIdsToPay.findIndex(elem => {
        return elem.id === id
      });*/
      this.sampleIdsToPay.splice(this.sampleIdsToPay.indexOf(id), 1);
    }
  }

  private initScrollBar(): void {
    const element = <HTMLElement>document.querySelector('.payment-list');
    this.simpleBar = new SimpleBar(element, { autoHide: false });
  }

}
