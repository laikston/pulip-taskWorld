import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownBoxComponent } from './dropdown-box.component';

describe('DropdownBoxComponent', () => {
  let component: DropdownBoxComponent;
  let fixture: ComponentFixture<DropdownBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
