import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAcceptanceComponent } from './store-acceptance.component';

describe('StoreAcceptanceComponent', () => {
  let component: StoreAcceptanceComponent;
  let fixture: ComponentFixture<StoreAcceptanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreAcceptanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
