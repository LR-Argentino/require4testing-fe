import {Priority} from '../shared/enums/priority';

export function getPriorityLabel(priority: Priority): string {
  switch (priority) {
    case Priority.HIGH:
      return 'High';
    case Priority.MEDIUM:
      return 'Medium';
    case Priority.LOW:
      return 'Low';
    default:
      return priority;
  }
}
