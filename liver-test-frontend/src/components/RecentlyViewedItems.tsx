import useFetch from "@/hooks/useFetch";
import FlexColumn from "./FlexColumn";
import ProductPreview from "./ProductPreview";

const RecentlyViewedItems = ({ userID }: { userID: string }) => {
  const { data: recentlyViewedEntries, loading, error } = useFetch<
    ReadonlyArray<{
      productID: string;
      productName: string;
      timestamp: number;
    }>
  >(`${process.env.NEXT_PUBLIC_API_URL}/users/${userID}/recentlyViewed`);
  return (
    <FlexColumn gap={8}>
      <h2>Recently viewed items</h2>
      {recentlyViewedEntries?.map(({ productID, productName }) => (
        <ProductPreview
          key={productID}
          productID={productID}
          productName={productName}
        />
      ))}
    </FlexColumn>
  );
};

export default RecentlyViewedItems;
