import useFetch from "@/hooks/useFetch";
import ErrorNotice from "./ErrorNotice";
import FlexColumn from "./FlexColumn";

const ProductDetail = ({ productID }: { productID: string }) => {
  const { data: product, loading, error } = useFetch<
    Readonly<{
      productID: string;
      productName: number;
    }>
  >(`${process.env.NEXT_PUBLIC_API_URL}/products/${productID}`);
  return (
    <>
      <h1>
        {product?.productName ?? (error ? "Product " + productID : "...")}
      </h1>
      <FlexColumn gap={8}>
        {product && (
          <>
            <p>And here is where I'd put a description of the product name</p>
            <p>If I had one!</p>
          </>
        )}
        {error && <ErrorNotice error={error} />}
      </FlexColumn>
    </>
  );
};

export default ProductDetail;
