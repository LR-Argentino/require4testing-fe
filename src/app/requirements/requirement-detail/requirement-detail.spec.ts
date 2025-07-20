import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementDetail } from './requirement-detail';

describe('RequirementDetail', () => {
  let component: RequirementDetail;
  let fixture: ComponentFixture<RequirementDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequirementDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequirementDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
