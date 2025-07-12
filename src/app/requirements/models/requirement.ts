import {PriorityLevel} from '../../../shared/enums/priority-level';
import {StatusLevel} from '../../../shared/enums/status-level';

export interface Requirement {
  id: number;
  title: string;
  description: string;
  priority: PriorityLevel;
  status: StatusLevel;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
}
