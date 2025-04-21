import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanApplicationDetailPagesComponent } from './loan-application-detail-pages.component';

describe('LoanApplicationDetailPagesComponent', () => {
  let component: LoanApplicationDetailPagesComponent;
  let fixture: ComponentFixture<LoanApplicationDetailPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanApplicationDetailPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanApplicationDetailPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
