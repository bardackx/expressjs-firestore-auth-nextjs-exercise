"use client";

import useAuth from "@/hooks/useAuth";

const HomePage = () => {
  const { user, loading } = useAuth({ redirect: "/products" });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (user == null) {
    return <div>Redirecting...</div>;
  }
  return <div>...</div>;
};

export default HomePage;
