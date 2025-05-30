import { TestBed } from '@angular/core/testing';

import { ApprovalBoService } from './approval-bo.service';

describe('ApprovalBoService', () => {
  let service: ApprovalBoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovalBoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
