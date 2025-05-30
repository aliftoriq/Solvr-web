import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlafonManagementPageComponent } from './plafon-management-page.component';

describe('PlafonManagementPageComponent', () => {
  let component: PlafonManagementPageComponent;
  let fixture: ComponentFixture<PlafonManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlafonManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlafonManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
