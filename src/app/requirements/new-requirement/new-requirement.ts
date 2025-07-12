import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PriorityLevel} from '../../../shared/enums/priority-level';
import {StatusLevel} from '../../../shared/enums/status-level';
import {RequirementService} from '../../core/services/requirement-service';

interface StatusOption {
  value: StatusLevel;
  label: string;
}

interface PriorityOptions {
  value: PriorityLevel;
  label: string;
}

@Component({
  selector: 'app-new-requirement',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './new-requirement.html',
  styleUrl: './new-requirement.css'
})
export class NewRequirement {
  private fb = inject(FormBuilder)
  private requirementService = inject(RequirementService)
  protected requirementForm: FormGroup<any>;
  protected isSubmitting = false;

  protected readonly priorityOptions: PriorityOptions[] = [
    {value: PriorityLevel.LOW, label: 'Low'},
    {value: PriorityLevel.MEDIUM, label: 'Medium'},
    {value: PriorityLevel.HIGH, label: 'High'}
  ]

  protected readonly statusOptions: StatusOption[] = [
    {value: StatusLevel.OPEN, label: 'Open'},
    {value: StatusLevel.IN_PROGRESS, label: 'In Progress'},
    {value: StatusLevel.CLOSED, label: 'Closed'}
  ]

  constructor() {
    this.requirementForm = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl(''),
      priority: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    });
  }

  protected isFieldInvalid(fieldName: string): boolean {
    const field = this.requirementForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.requirementForm.valid) {
      this.isSubmitting = true;

      // TODO: call API
      console.log('Requirement Data:', this.requirementForm.value);

      setTimeout(() => {
        this.isSubmitting = false;
        alert('Requirement saved successfully!');
        this.requirementForm.reset();
      }, 1000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.requirementForm.controls).forEach(key => {
        this.requirementForm.get(key)?.markAsTouched();
      });
    }
  }
}
