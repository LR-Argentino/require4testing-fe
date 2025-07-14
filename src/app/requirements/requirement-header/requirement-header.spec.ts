import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementHeader } from './requirement-header';

describe('RequirementHeader', () => {
  let component: RequirementHeader;
  let fixture: ComponentFixture<RequirementHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequirementHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequirementHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
