import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanApplicationHistoryComponent } from './loan-application-history.component';

describe('LoanApplicationHistoryComponent', () => {
  let component: LoanApplicationHistoryComponent;
  let fixture: ComponentFixture<LoanApplicationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanApplicationHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanApplicationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
