import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RequirementTable} from './test-case-table';

describe('RequirementTable', () => {
  let component: RequirementTable;
  let fixture: ComponentFixture<RequirementTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequirementTable]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RequirementTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
