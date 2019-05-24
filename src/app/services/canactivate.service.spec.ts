import { TestBed } from '@angular/core/testing';

import { CanactivateService } from './canactivate.service';

describe('CanactivateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanactivateService = TestBed.get(CanactivateService);
    expect(service).toBeTruthy();
  });
});
