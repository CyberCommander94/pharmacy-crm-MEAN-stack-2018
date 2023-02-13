import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersMainComponent } from './suppliers-main.component';

describe('SuppliersMainComponent', () => {
  let component: SuppliersMainComponent;
  let fixture: ComponentFixture<SuppliersMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliersMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
