import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PriorityLevel } from '../../../shared/enums/priority-level';
import { StatusLevel } from '../../../shared/enums/status-level';
import { RequirementService } from '../../core/services/requirement-service';
import { CreateRequirementDto } from '../models/create-update-requirement-dto';
import { RequirementFormControls } from '../models/requirement-form';
import { PRIORITY_OPTIONS, STATUS_OPTIONS, PriorityOption, StatusOption } from '../models/requirement-options';

@Component({
  selector: 'app-new-requirement',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './new-requirement.html',
  styleUrl: './new-requirement.css'
})
export class NewRequirement implements OnInit {
  private readonly requirementService = inject(RequirementService);
  private readonly fb = inject(FormBuilder)

  protected requirementForm!: FormGroup<RequirementFormControls>;
  protected isSubmitting = false;

  protected readonly priorityOptions: PriorityOption[] = PRIORITY_OPTIONS;
  protected readonly statusOptions: StatusOption[] = STATUS_OPTIONS;

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.requirementForm = this.fb.group<RequirementFormControls>({
      title: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
      description: new FormControl('', { nonNullable: true }),
      priority: new FormControl(PriorityLevel.MEDIUM, { nonNullable: true, validators: [Validators.required] }),
      status: new FormControl(StatusLevel.OPEN, { nonNullable: true, validators: [Validators.required] })
    });
  }

  protected isFieldInvalid(fieldName: string): boolean {
    const field = this.requirementForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  protected onSubmit(): void {
    if (this.requirementForm.valid) {
      this.isSubmitting = true;
      const formValue = this.requirementForm.value;
      
      const requirement: CreateRequirementDto = {
        title: formValue.title!,
        description: formValue.description!,
        priority: formValue.priority!,
        status: formValue.status!
      };
      
      this.requirementService.createRequirement(requirement);
      
      // TODO: Replace with proper notification service and navigation
      setTimeout(() => {
        this.isSubmitting = false;
        alert('Requirement saved successfully!');
        this.resetForm();
      }, 1000);
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  private resetForm(): void {
    this.requirementForm.reset({
      title: '',
      description: '',
      priority: PriorityLevel.MEDIUM,
      status: StatusLevel.OPEN
    });
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.requirementForm.controls).forEach(key => {
      this.requirementForm.get(key)?.markAsTouched();
    });
  }
}
