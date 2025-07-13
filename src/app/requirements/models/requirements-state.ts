import {Requirement} from './requirement';

export interface RequirementsState {
  requirements: Requirement[];
  currentRequirement: Requirement | null;
  isLoading: boolean;
  error: string | null;
}
