import {Component, EventEmitter, inject, Input, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RequirementService} from '../../../core/services/requirement-service';
import {CreateRequirementDto} from '../../../shared/models/create-requirement-dto';


@Component({
  selector: 'app-create-requirement',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-requirement.html',
  styleUrl: './create-requirement.css'
})
export class CreateRequirement {
  @Input() isVisible = false;
  @Input() requirements: CreateRequirementDto[] = [];
  @Output() close = new EventEmitter<void>();

  private readonly requirementService = inject(RequirementService);

  protected form: FormGroup;
  protected isSubmitting = false;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

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
        this.requirementService.createRequirement(requirement);
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
