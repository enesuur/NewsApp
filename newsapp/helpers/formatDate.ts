import { Timestamp } from "firebase/firestore";

export default function formatDate(timestamp: Timestamp): any {
  const dateObj = timestamp.toDate();
  return dateObj.toLocaleDateString("en-UK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
