import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreWriteOffComponent } from './store-write-off.component';

describe('StoreWriteOffComponent', () => {
  let component: StoreWriteOffComponent;
  let fixture: ComponentFixture<StoreWriteOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreWriteOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreWriteOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
