import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewMarketingPageComponent } from './review-marketing-page.component';

describe('ReviewMarketingPageComponent', () => {
  let component: ReviewMarketingPageComponent;
  let fixture: ComponentFixture<ReviewMarketingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewMarketingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewMarketingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
