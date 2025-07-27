import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRunTable } from './test-run-table';

describe('TestRunTable', () => {
  let component: TestRunTable;
  let fixture: ComponentFixture<TestRunTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRunTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestRunTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
