import {TestRunStatus} from '../enums/test-run-status';
import {TestCase} from './test-case';

export interface TestRun {
  id: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  status: TestRunStatus;
  createdBy: number;
  testCases: TestCase[];
}
