import {Component, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CreateRequirementDto} from '../../../shared/models/create-requirement-dto';
import {TestRunService} from '../../../core/services/test-run-service';
import {DateTimePicker, DateTimeRange} from '../../../shared/date-time-picker/date-time-picker';

@Component({
  selector: 'app-create-test-run',
  imports: [
    ReactiveFormsModule,
    DateTimePicker
  ],
  templateUrl: './create-test-run.html',
  styleUrl: './create-test-run.css'
})
export class CreateTestRun {
  @Input() isVisible = false;
  @Input() requirements: CreateRequirementDto[] = [];
  @Output() close = new EventEmitter<void>();
  private readonly testRunService = inject(TestRunService);
  private readonly fb = inject(FormBuilder);
  protected dateRange = signal<DateTimeRange | null>(null);

  protected form: FormGroup = this.createForm();
  protected isSubmitting = false;

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      priority: [''],
    });
  }

  onSubmit() {
    if (this.form.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const formValue = this.form.value;

      setTimeout(() => {
        const requirement: CreateRequirementDto = {
          title: formValue.title,
          description: formValue.description,
          priority: formValue.priority
        }
        const range = this.dateRange();
        if (range?.startDate && range?.endDate) {
          console.log('Saving:', range);
          // Service call hier
        }
        // this.testRunService.createTestRun()
        this.isSubmitting = false;
        this.onClose();
      }, 500);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }
  
  onClose() {
    this.form.reset();
    this.isSubmitting = false;
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}
