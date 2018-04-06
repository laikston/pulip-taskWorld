import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListBoxComponent } from './task-list-box.component';

describe('TaskListBoxComponent', () => {
  let component: TaskListBoxComponent;
  let fixture: ComponentFixture<TaskListBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
