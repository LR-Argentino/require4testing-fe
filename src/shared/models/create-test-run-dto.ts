export interface CreateTestRunDto {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  testCaseIds: number[];
}
