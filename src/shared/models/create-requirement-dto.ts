import {Priority} from '../enums/priority';

export interface CreateRequirementDto {
  readonly title: string;
  readonly description: string;
  readonly priority: Priority;
}
