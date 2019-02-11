import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplePaymentComponent } from './sample-payment.component';

describe('SamplePaymentComponent', () => {
  let component: SamplePaymentComponent;
  let fixture: ComponentFixture<SamplePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
