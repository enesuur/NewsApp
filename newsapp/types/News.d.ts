import { Timestamp } from "firebase/firestore";

export default interface NewsArticle {
    id:string;
    title: string;
    description?: string;
    category: string;
    date: Timestamp;
    url: string;
  }