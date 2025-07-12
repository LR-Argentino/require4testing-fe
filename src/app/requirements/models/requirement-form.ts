import { FormControl } from '@angular/forms';
import { PriorityLevel } from '../../../shared/enums/priority-level';
import { StatusLevel } from '../../../shared/enums/status-level';

export interface RequirementFormControls {
  title: FormControl<string>;
  description: FormControl<string>;
  priority: FormControl<PriorityLevel>;
  status: FormControl<StatusLevel>;
}