import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsContractsComponent } from './reports-contracts.component';

describe('ReportsContractsComponent', () => {
  let component: ReportsContractsComponent;
  let fixture: ComponentFixture<ReportsContractsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsContractsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
