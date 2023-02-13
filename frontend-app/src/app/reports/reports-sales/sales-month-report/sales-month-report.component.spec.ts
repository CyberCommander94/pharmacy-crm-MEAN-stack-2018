import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesMonthReportComponent } from './sales-month-report.component';

describe('SalesMonthReportComponent', () => {
  let component: SalesMonthReportComponent;
  let fixture: ComponentFixture<SalesMonthReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesMonthReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesMonthReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
