import * as userDAO from "../dao/userDAO";
import { RecentlyViewedProduct } from "../types/userTypes";

export const getRecentlyViewedProducts = async (
  userID: string,
): Promise<RecentlyViewedProduct[]> => {
  const products = await userDAO.getUserRecentlyViewed(userID);
  return products;
};

const MAX_RECENTLY_VIEWED_PRODUCTS = 10;

export async function updateRecentlyViewedProducts(
  userID: string,
  productID: string,
) {
  /**
   * Notes about the recentlyViewed store:
   * - users/{userID}/recentlyViewed
   * - Store product IDs and timestamps (for efficient querying and limiting).
   * - Limit the number of products to 10.
   */

  const currentList = await userDAO.getUserRecentlyViewed(userID);

  const index = currentList.findIndex((e) => e.productID === productID);

  const timestamp = Date.now();
  if (index > 0) {
    await userDAO.updateRecentlyViewedTimestamp(userID, productID, timestamp);
  } else {
    currentList.sort((a, b) => b.timestamp - a.timestamp);
    while (currentList.length > MAX_RECENTLY_VIEWED_PRODUCTS) {
      await userDAO.deleteRecentlyViewedEntry(
        userID,
        currentList.pop()!.productID,
      );
    }
    await userDAO.createRecentlyViewedEntry(userID, productID, timestamp);
  }
}
