import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTradeComponent } from './store-trade.component';

describe('StoreTradeComponent', () => {
  let component: StoreTradeComponent;
  let fixture: ComponentFixture<StoreTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
