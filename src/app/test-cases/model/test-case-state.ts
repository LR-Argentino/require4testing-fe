import {TestCase} from './test-case';

export interface TestCaseState {
  testCases: TestCase[];
  isLoading: boolean;
  error: string | null;
}
