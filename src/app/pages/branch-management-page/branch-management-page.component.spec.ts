import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchManagementPageComponent } from './branch-management-page.component';

describe('BranchManagementPageComponent', () => {
  let component: BranchManagementPageComponent;
  let fixture: ComponentFixture<BranchManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
