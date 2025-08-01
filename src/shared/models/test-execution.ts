import {TestRun} from './test-run';
import {TestCase} from './test-case';

export interface TestExecution {
  id: number;
  testerId: number;
  testRun: TestRun;
  testCase: TestCase;
  testResult: string | null;
  comment: string | null;
}
