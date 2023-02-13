import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReturnReportComponent } from './view-return-report.component';

describe('ViewReturnReportComponent', () => {
  let component: ViewReturnReportComponent;
  let fixture: ComponentFixture<ViewReturnReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReturnReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReturnReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
