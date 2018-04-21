import { TestBed, inject } from '@angular/core/testing';

import { ProjectInfoBoxService } from './project-info-box.service';

describe('ProjectInfoBoxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectInfoBoxService]
    });
  });

  it('should be created', inject([ProjectInfoBoxService], (service: ProjectInfoBoxService) => {
    expect(service).toBeTruthy();
  }));
});
