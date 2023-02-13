import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsMainComponent } from './contracts-main.component';

describe('ContractsMainComponent', () => {
  let component: ContractsMainComponent;
  let fixture: ComponentFixture<ContractsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
