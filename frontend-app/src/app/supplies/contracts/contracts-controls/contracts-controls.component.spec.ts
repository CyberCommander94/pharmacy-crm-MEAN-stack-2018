import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsControlsComponent } from './contracts-controls.component';

describe('ContractsControlsComponent', () => {
  let component: ContractsControlsComponent;
  let fixture: ComponentFixture<ContractsControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractsControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
