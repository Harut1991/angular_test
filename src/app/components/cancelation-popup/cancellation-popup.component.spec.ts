import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationPopupComponent } from './cancellation-popup.component';

describe('CancellationPopupComponent', () => {
  let component: CancellationPopupComponent;
  let fixture: ComponentFixture<CancellationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancellationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
