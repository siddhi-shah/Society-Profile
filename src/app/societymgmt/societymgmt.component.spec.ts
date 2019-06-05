import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietymgmtComponent } from './societymgmt.component';

describe('SocietymgmtComponent', () => {
  let component: SocietymgmtComponent;
  let fixture: ComponentFixture<SocietymgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocietymgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietymgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
