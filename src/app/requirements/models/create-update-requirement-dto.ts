import {PriorityLevel} from '../../../shared/enums/priority-level';
import {StatusLevel} from '../../../shared/enums/status-level';

export interface CreateUpdateRequirementDto {
  title?: string;
  description?: string;
  priority?: PriorityLevel;
  status?: StatusLevel
}
