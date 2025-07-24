import {Status} from '../shared/enums/status';

export function getStatusClasses(status: Status): string {
  switch (status) {
    case Status.OPEN:
      return 'bg-blue-100 text-blue-800';
    case Status.IN_PROGRESS:
      return 'bg-yellow-100 text-yellow-800';
    case Status.CLOSED:
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
