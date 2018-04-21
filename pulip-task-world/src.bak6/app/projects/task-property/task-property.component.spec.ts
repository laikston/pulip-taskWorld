import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPropertyComponent } from './task-property.component';

describe('TaskPropertyComponent', () => {
  let component: TaskPropertyComponent;
  let fixture: ComponentFixture<TaskPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
