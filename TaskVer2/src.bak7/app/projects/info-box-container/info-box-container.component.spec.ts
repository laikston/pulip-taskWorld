import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBoxContainerComponent } from './info-box-container.component';

describe('InfoBoxContainerComponent', () => {
  let component: InfoBoxContainerComponent;
  let fixture: ComponentFixture<InfoBoxContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoBoxContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoBoxContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
