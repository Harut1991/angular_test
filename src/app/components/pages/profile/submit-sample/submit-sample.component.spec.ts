import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitSampleComponent } from './submit-sample.component';

describe('SubmitSampleComponent', () => {
  let component: SubmitSampleComponent;
  let fixture: ComponentFixture<SubmitSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
