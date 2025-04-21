import { TestBed } from '@angular/core/testing';

import { ReviewMarketingService } from './review-marketing.service';

describe('ReviewMarketingService', () => {
  let service: ReviewMarketingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewMarketingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
