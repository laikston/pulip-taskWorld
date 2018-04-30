import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListBoxComponent } from './project-list-box.component';

describe('ProjectListBoxComponent', () => {
  let component: ProjectListBoxComponent;
  let fixture: ComponentFixture<ProjectListBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectListBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
