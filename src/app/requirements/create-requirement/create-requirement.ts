import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';


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
  @Input() requirements: CreateRequirement[] = [];
  @Output() close = new EventEmitter<void>();

  form: FormGroup;
  isSubmitting = false;

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
      requirementId: ['']
    });
  }

  onSubmit() {
    if (this.form.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const formValue = this.form.value;

      // Simulate API call delay
      setTimeout(() => {
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
