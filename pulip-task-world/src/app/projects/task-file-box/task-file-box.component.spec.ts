import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFileBoxComponent } from './task-file-box.component';

describe('TaskFileBoxComponent', () => {
  let component: TaskFileBoxComponent;
  let fixture: ComponentFixture<TaskFileBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskFileBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFileBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
