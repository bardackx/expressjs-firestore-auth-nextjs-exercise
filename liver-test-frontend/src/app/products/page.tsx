"use client";

import useAuth from "@/hooks/useAuth";
import ProductsList from "@/components/ProductsList";
import AppShell from "@/components/AppShell";

const ProductsPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <AppShell title="All products">
      {isAuthenticated && <ProductsList />}
    </AppShell>
  );
};

export default ProductsPage;
