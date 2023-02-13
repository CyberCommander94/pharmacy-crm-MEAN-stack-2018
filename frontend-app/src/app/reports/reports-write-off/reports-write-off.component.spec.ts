import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsWriteOffComponent } from './reports-write-off.component';

describe('ReportsWriteOffComponent', () => {
  let component: ReportsWriteOffComponent;
  let fixture: ComponentFixture<ReportsWriteOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsWriteOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsWriteOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
