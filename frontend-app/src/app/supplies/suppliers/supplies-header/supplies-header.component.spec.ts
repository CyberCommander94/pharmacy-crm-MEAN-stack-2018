import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesHeaderComponent } from './supplies-header.component';

describe('SuppliesHeaderComponent', () => {
  let component: SuppliesHeaderComponent;
  let fixture: ComponentFixture<SuppliesHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliesHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
