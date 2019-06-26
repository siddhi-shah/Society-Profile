import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingpaymentComponent } from './pendingpayment.component';

describe('PendingpaymentComponent', () => {
  let component: PendingpaymentComponent;
  let fixture: ComponentFixture<PendingpaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingpaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
