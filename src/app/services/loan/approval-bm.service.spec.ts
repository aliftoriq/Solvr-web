import { TestBed } from '@angular/core/testing';

import { ApprovalBmService } from './approval-bm.service';

describe('ApprovalBmService', () => {
  let service: ApprovalBmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovalBmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
