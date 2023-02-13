import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesControlsComponent } from './supplies-controls.component';

describe('SuppliesControlsComponent', () => {
  let component: SuppliesControlsComponent;
  let fixture: ComponentFixture<SuppliesControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliesControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliesControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
