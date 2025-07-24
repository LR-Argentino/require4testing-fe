import {Priority} from '../enums/priority';

export interface CreateRequirement {
  readonly title: string;
  readonly description: string;
  readonly priority: Priority;
}
