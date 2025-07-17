import {Priority} from '../enums/priority';
import {Status} from '../enums/status';

export interface Requirement {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly priority: Priority;
  readonly status: Status;
  readonly createdBy: number;
  readonly updatedAt: Date;
  readonly createdAt: Date;
}
