import { Timestamp } from "firebase/firestore";

export interface Payment {
  id: number;
  amount: number;
  payment: string;
  type: string;
  isPaid: boolean;
  dateReceived: Timestamp | null;
  dueDate: Timestamp | null;
}
