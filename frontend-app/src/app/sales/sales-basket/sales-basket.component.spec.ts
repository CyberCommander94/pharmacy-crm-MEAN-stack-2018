import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesBasketComponent } from './sales-basket.component';

describe('SalesBasketComponent', () => {
  let component: SalesBasketComponent;
  let fixture: ComponentFixture<SalesBasketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesBasketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
