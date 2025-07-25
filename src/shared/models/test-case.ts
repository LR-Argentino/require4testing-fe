import {Status} from '../enums/status';
import {TestResult} from '../enums/test-result';

export interface TestCase {
  id: number;
  title: string;
  description: string;
  requirementId: number;
  status: Status;
  testResult: TestResult | null;
  createdBy: number;
  updatedAt: String;
  creationDate: String;
}
