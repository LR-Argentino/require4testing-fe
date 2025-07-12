import { PriorityLevel } from '../../../shared/enums/priority-level';
import { StatusLevel } from '../../../shared/enums/status-level';

export interface StatusOption {
  value: StatusLevel;
  label: string;
}

export interface PriorityOption {
  value: PriorityLevel;
  label: string;
}

export const PRIORITY_OPTIONS: PriorityOption[] = [
  { value: PriorityLevel.LOW, label: 'Low' },
  { value: PriorityLevel.MEDIUM, label: 'Medium' },
  { value: PriorityLevel.HIGH, label: 'High' }
];

export const STATUS_OPTIONS: StatusOption[] = [
  { value: StatusLevel.OPEN, label: 'Open' },
  { value: StatusLevel.IN_PROGRESS, label: 'In Progress' },
  { value: StatusLevel.CLOSED, label: 'Closed' }
];