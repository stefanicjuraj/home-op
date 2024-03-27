export interface Maintenance {
  id: number;
  description: string;
  assignedTo: string;
  dueDate: Date | null;
  isCompleted: boolean;
}
