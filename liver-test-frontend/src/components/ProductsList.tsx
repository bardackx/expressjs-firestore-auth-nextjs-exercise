import useFetch from "@/hooks/useFetch";
import ProductPreview from "./ProductPreview";
import FlexColumn from "./FlexColumn";
import ErrorNotice from "./ErrorNotice";

const ProductsList = () => {
  const { data: products, loading, error } = useFetch<
    ReadonlyArray<{
      productID: string;
      productName: string;
    }>
  >(`${process.env.NEXT_PUBLIC_API_URL}/products`);

  return (
    <FlexColumn gap={8}>
      {products?.map(({ productID, productName }) => (
        <ProductPreview
          key={productID}
          productID={productID}
          productName={productName}
        />
      ))}
      {error && <ErrorNotice error={error} />}
    </FlexColumn>
  );
};

export default ProductsList;
