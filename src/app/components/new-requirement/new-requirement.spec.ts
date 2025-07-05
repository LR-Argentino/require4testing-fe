import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRequirement } from './new-requirement';

describe('NewRequirement', () => {
  let component: NewRequirement;
  let fixture: ComponentFixture<NewRequirement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRequirement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRequirement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
