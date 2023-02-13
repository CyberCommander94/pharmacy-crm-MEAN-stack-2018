import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsReturnsComponent } from './reports-returns.component';

describe('ReportsReturnsComponent', () => {
  let component: ReportsReturnsComponent;
  let fixture: ComponentFixture<ReportsReturnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsReturnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
