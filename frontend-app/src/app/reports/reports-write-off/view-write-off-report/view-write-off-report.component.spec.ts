import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWriteOffReportComponent } from './view-write-off-report.component';

describe('ViewWriteOffReportComponent', () => {
  let component: ViewWriteOffReportComponent;
  let fixture: ComponentFixture<ViewWriteOffReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewWriteOffReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWriteOffReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
