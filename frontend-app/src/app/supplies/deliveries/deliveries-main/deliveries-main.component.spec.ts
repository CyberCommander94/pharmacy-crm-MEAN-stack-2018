import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesMainComponent } from './deliveries-main.component';

describe('DeliveriesMainComponent', () => {
  let component: DeliveriesMainComponent;
  let fixture: ComponentFixture<DeliveriesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveriesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveriesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
