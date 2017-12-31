import { TestBed, inject } from '@angular/core/testing';

import { RegauthService } from './regauth.service';

describe('RegauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegauthService]
    });
  });

  it('should be created', inject([RegauthService], (service: RegauthService) => {
    expect(service).toBeTruthy();
  }));
});
