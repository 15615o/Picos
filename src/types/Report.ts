import { Timestamp } from "firebase/firestore";

export interface Report {
  id: string;
  content: string;
  createdAt: Timestamp;
}