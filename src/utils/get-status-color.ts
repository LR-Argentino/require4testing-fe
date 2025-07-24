import {Status} from '../shared/enums/status';

export function getStatusColor(status: Status): string {
  switch (status) {
    case Status.OPEN:
      return 'bg-blue-500';
    case Status.IN_PROGRESS:
      return 'bg-yellow-500';
    case Status.CLOSED:
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
}
