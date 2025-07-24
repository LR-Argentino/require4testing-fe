import {Status} from '../shared/enums/status';

export function getStatusLabel(status: Status): string {
  switch (status) {
    case Status.OPEN:
      return 'Open';
    case Status.IN_PROGRESS:
      return 'In Research';
    case Status.CLOSED:
      return 'Closed';
    default:
      return status;
  }
}
