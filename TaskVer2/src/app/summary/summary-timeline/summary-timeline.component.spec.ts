import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryTimelineComponent } from './summary-timeline.component';

describe('SummaryTimelineComponent', () => {
  let component: SummaryTimelineComponent;
  let fixture: ComponentFixture<SummaryTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
