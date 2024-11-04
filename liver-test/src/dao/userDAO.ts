import admin from "firebase-admin";
import { RecentlyViewedProduct } from "../types/userTypes";
import "../util/initFirebase";

const db = admin.firestore();

if (process.env.NODE_ENV === "development") {
  db.settings({
    host: "127.0.0.1:39097",
    ssl: false,
  });
}

function allRecentlyViewedEntryRef(userID: string) {
  return db
    .collection("users")
    .doc(userID)
    .collection("recentlyViewed");
}

function recentlyViewedEntryRef(
  userID: string,
  productID: string,
) {
  return allRecentlyViewedEntryRef(userID).doc(productID);
}

export async function getUserRecentlyViewed(
  userID: string,
): Promise<RecentlyViewedProduct[]> {
  const recentlyViewedRef = allRecentlyViewedEntryRef(userID);
  const data = await recentlyViewedRef
    .orderBy("timestamp", "desc")
    .get();
  return data.docs
    .map((doc) => ({
      productID: doc.id,
      timestamp: doc.get("timestamp"),
    }));
}

export async function createRecentlyViewedEntry(
  userID: string,
  productID: string,
  timestamp: number,
) {
  await recentlyViewedEntryRef(userID, productID).set({
    productID,
    timestamp,
  });
}

export async function updateRecentlyViewedTimestamp(
  userID: string,
  productID: string,
  timestamp: number,
) {
  await recentlyViewedEntryRef(userID, productID).update({ timestamp });
}

export async function deleteRecentlyViewedEntry(
  userID: string,
  productID: string,
) {
  await recentlyViewedEntryRef(userID, productID).delete();
}
