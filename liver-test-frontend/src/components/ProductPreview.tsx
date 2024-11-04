import Link from "next/link";
import style from "./components.module.css";

const RecentlyViewedItems = ({
  productID,
  productName,
}: {
  productID: string;
  productName: string;
}) => {
  return (
    <Link key={productID} href={`/products/${productID}`}>
      <div className={style.listItem}>
        {productName ?? "Product " + productID}
      </div>
    </Link>
  );
};

export default RecentlyViewedItems;
