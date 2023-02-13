import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreControlsComponent } from './store-controls.component';

describe('StoreControlsComponent', () => {
  let component: StoreControlsComponent;
  let fixture: ComponentFixture<StoreControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
