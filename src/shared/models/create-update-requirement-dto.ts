export interface CreateUpdateRequirementDto {
  title: string | null;
  description: string | null;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | null;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED' | null;
}
