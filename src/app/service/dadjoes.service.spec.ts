import { TestBed } from '@angular/core/testing';

import { DadjoesService } from './dadjoes.service';

describe('DadjoesService', () => {
  let service: DadjoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadjoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
