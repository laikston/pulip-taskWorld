import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListHeaderBoxComponent } from './project-list-header-box.component';

describe('ProjectListHeaderBoxComponent', () => {
  let component: ProjectListHeaderBoxComponent;
  let fixture: ComponentFixture<ProjectListHeaderBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectListHeaderBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListHeaderBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
