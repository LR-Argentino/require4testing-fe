import {Component, EventEmitter, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RequirementService} from '../../../core/services/requirement-service';
import {TestCase} from '../../../shared/models/test-case';
import {CreateTestCaseDto} from '../../../shared/models/create-test-case-dto';

@Component({
  selector: 'app-create-test-case',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-test-case.html',
  styleUrl: './create-test-case.css'
})
export class CreateTestCase implements OnInit {
  protected readonly requirementService = inject(RequirementService);
  private readonly fb = inject(FormBuilder);

  @Input() isVisible = false;
  @Input() testCases: TestCase[] = [];
  @Input() close = new EventEmitter();

  protected form: FormGroup = this.createForm();
  protected isSubmitting = false;

  ngOnInit(): void {
    this.requirementService.getRequirements()
    this.requirementService.notClosedRequirements();

  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      requirementId: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const formValue = this.form.value;
      console.log('CreateTestCase initialized');
      console.log(this.requirementService.getRequirements())
      console.log(this.requirementService.notClosedRequirements());
      setTimeout(() => {
        const testCases: CreateTestCaseDto = {
          title: formValue.title,
          description: formValue.description,
          requirementId: formValue.requirementId
        }
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
