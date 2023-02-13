import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsViewComponent } from './contracts-view.component';

describe('ContractsViewComponent', () => {
  let component: ContractsViewComponent;
  let fixture: ComponentFixture<ContractsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
