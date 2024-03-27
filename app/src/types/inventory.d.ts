export interface Inventory {
  id: number;
  amount: number;
  name: string;
  type: string;
  date: Timestamp | null;
}
