import { TestBed } from '@angular/core/testing';

import { ContactSettingsService } from './contact-settings.service';

describe('ContactSettingsService', () => {
  let service: ContactSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
