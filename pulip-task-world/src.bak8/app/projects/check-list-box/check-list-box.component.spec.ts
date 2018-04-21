import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListBoxComponent } from './check-list-box.component';

describe('CheckListBoxComponent', () => {
  let component: CheckListBoxComponent;
  let fixture: ComponentFixture<CheckListBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckListBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
