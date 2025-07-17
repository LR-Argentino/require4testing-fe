import {PriorityLevel} from '../../../shared/enums/priority-level';
import {StatusLevel} from '../../../shared/enums/status-level';

export interface CreateRequirementDto {
  title: string;
  description: string;
  priority: PriorityLevel;
}

export interface UpdateRequirementDto {
  title?: string;
  description?: string;
  priority?: PriorityLevel;
  status?: StatusLevel;
}
