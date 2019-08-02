import { TestBed } from '@angular/core/testing';

import { AdminusersService } from './adminusers.service';

describe('AdminusersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminusersService = TestBed.get(AdminusersService);
    expect(service).toBeTruthy();
  });
});
