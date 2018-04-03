import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeedbackComponent } from './home-feedback.component';

describe('HomeFeedbackComponent', () => {
  let component: HomeFeedbackComponent;
  let fixture: ComponentFixture<HomeFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
