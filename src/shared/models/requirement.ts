export interface Requirement {
  id: string;
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'draft' | 'review' | 'approved' | 'rejected';
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
}
