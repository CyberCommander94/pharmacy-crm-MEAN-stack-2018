import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryAddComponent } from './directory-add.component';

describe('DirectoryAddComponent', () => {
  let component: DirectoryAddComponent;
  let fixture: ComponentFixture<DirectoryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectoryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
