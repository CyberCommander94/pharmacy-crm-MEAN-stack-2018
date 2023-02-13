import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderReportComponent } from './view-order-report.component';

describe('ViewOrderReportComponent', () => {
  let component: ViewOrderReportComponent;
  let fixture: ComponentFixture<ViewOrderReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrderReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
