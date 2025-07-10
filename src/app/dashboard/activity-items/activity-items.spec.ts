import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityItems } from './activity-items';

describe('ActivityItems', () => {
  let component: ActivityItems;
  let fixture: ComponentFixture<ActivityItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
