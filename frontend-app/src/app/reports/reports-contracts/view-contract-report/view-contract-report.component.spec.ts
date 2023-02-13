import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContractReportComponent } from './view-contract-report.component';

describe('ViewContractReportComponent', () => {
  let component: ViewContractReportComponent;
  let fixture: ComponentFixture<ViewContractReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewContractReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewContractReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
