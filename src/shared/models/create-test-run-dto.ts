export interface CreateTestRunDto {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  testCaseIds: number[];
}
