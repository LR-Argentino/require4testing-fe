import {Component, inject, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {Navbar} from '../navbar/navbar';

interface RequirementForm {
  title: string;
  description: string;
  priority: string;
  status: string;
  assignee: string;
}

@Component({
  selector: 'app-new-requirement',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Navbar],
  templateUrl: './new-requirement.html',
  styleUrl: './new-requirement.css',
  standalone: true
})
export class NewRequirement {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  isLoading: WritableSignal<boolean> = signal(false);
  showSuccessMessage: WritableSignal<boolean> = signal(false);

  requirementForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    priority: ['', Validators.required],
    status: ['', Validators.required],
    assignee: ['']
  });

  async onSubmit(): Promise<void> {
    if (this.requirementForm.valid) {
      this.isLoading.set(true);

      try {
        // Simulate API call
        await this.createRequirement(this.requirementForm.value);

        this.showSuccessMessage.set(true);

        // Reset form
        this.requirementForm.reset();

        // Hide success message after 3 seconds
        setTimeout(() => {
          this.showSuccessMessage.set(false);
          // Optional: Navigate to requirements list
          // this.router.navigate(['/requirements']);
        }, 3000);

      } catch (error) {
        console.error('Error creating requirement:', error);
        // Handle error - you could show an error message here
      } finally {
        this.isLoading.set(false);
      }
    } else {
      // Mark all fields as touched to show validation errors
      this.requirementForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/requirements']);
  }

  private async createRequirement(requirement: RequirementForm): Promise<void> {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Creating requirement:', requirement);
        resolve();
      }, 2000);
    });
  }
}

