import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalBmPageComponent } from './approval-bm-page.component';

describe('ApprovalBmPageComponent', () => {
  let component: ApprovalBmPageComponent;
  let fixture: ComponentFixture<ApprovalBmPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalBmPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalBmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
