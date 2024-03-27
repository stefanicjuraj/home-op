import { Timestamp } from "firebase/firestore";

export interface Visitor {
  id: number;
  name: string;
  occasion: string;
  date: Timestamp | null;
  time: string;
}
