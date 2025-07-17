import {FormControl} from '@angular/forms';
import {PriorityLevel} from '../../../shared/enums/priority-level';

export interface RequirementFormControls {
  title: FormControl<string>;
  description: FormControl<string>;
  priority: FormControl<PriorityLevel>;
}
