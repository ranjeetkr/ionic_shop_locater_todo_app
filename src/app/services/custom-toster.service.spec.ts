import { TestBed } from '@angular/core/testing';

import { CustomTosterService } from './custom-toster.service';

describe('CustomTosterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomTosterService = TestBed.get(CustomTosterService);
    expect(service).toBeTruthy();
  });
});
