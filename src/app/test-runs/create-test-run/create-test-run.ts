import {Component, effect, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TestCaseService} from '../../../core/services/test-case-service';
import {TestRunService} from '../../../core/services/test-run-service';
import {CreateTestRunDto} from '../../../shared/models/create-test-run-dto';

@Component({
  selector: 'app-create-test-run',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './create-test-run.html',
  styleUrl: './create-test-run.css'
})
export class CreateTestRun {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();
  private readonly testCaseService = inject(TestCaseService);
  private readonly testRunService = inject(TestRunService);
  private readonly fb = inject(FormBuilder);
  protected isSubmitting = false;


  protected form: FormGroup = this.createForm();

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      startDate: [''],
      endDate: [''],
      testCaseIds: []
    });
  }

  selectedTestCaseIds = signal<number[]>([]);
  openTestCases = this.testCaseService.openTestCases;

  constructor() {
    effect(() => {
      this.testCaseService.getTestCases();
    });
  }

  protected toggleTestCase(id: number) {
    const current = this.selectedTestCaseIds();
    console.log(id);
    if (current.includes(id)) {
      this.selectedTestCaseIds.set(current.filter(cid => cid !== id));
    } else {
      this.selectedTestCaseIds.set([...current, id]);
    }
  }

  protected onSubmit() {
    if (this.form.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const formValue = this.form.value;
      console.log(formValue);

      setTimeout(() => {
        const newTestRun: CreateTestRunDto = {
          title: formValue.title,
          description: formValue.description,
          startDate: formValue.startDate,
          endDate: formValue.endDate,
          testCaseIds: this.selectedTestCaseIds()
        }
        console.log(newTestRun)
        this.testRunService.createTestRun(newTestRun);
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

  protected onClose() {
    this.form.reset();
    this.isSubmitting = false;
    this.close.emit();
  }

  protected onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

}
