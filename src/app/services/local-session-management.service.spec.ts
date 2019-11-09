import { TestBed } from '@angular/core/testing';

import { LocalSessionManagementService } from './local-session-management.service';

describe('LocalSessionManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalSessionManagementService = TestBed.get(LocalSessionManagementService);
    expect(service).toBeTruthy();
  });
});
