"use client";

import { useParams } from "next/navigation";

import useAuth from "@/hooks/useAuth";
import ProductDetail from "@/components/ProductDetail";
import AppShell from "@/components/AppShell";

const ProductPage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  return (
    <AppShell >
      {isAuthenticated && typeof id === "string" && (
        <ProductDetail productID={id} />
      )}
    </AppShell>
  );
};

export default ProductPage;
