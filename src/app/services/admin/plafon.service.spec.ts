import { TestBed } from '@angular/core/testing';

import { PlafonService } from './plafon.service';

describe('PlafonService', () => {
  let service: PlafonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlafonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
