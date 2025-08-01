import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestRun } from './create-test-run';

describe('CreateTestRun', () => {
  let component: CreateTestRun;
  let fixture: ComponentFixture<CreateTestRun>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTestRun]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTestRun);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
