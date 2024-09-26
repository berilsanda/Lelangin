import { Timestamp } from "firebase/firestore";

export default function serializeTime(dateObject: Timestamp) {
  if (!dateObject) {
    return null;
  }
  const { seconds, nanoseconds } = dateObject;

  const milliseconds = seconds * 1000 + nanoseconds / 1000000;
  const serializedDate = new Date(milliseconds).toISOString();

  return serializedDate;
}
