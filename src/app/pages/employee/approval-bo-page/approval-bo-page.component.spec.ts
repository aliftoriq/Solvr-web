import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalBoPageComponent } from './approval-bo-page.component';

describe('ApprovalBoPageComponent', () => {
  let component: ApprovalBoPageComponent;
  let fixture: ComponentFixture<ApprovalBoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalBoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalBoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
