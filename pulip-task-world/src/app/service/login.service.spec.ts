import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('Login.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService]
    });
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
});
