import {StatusLevel} from '../../../shared/enums/status-level';
import {TestResult} from '../../../shared/enums/test-result';

export interface TestCase {
  id: number;
  title: string;
  description: string;
  requirementId: number;
  status: StatusLevel;
  testResult: TestResult;
  createdBy: number;
  updatedAt: string;
  creationDate: string;
}
