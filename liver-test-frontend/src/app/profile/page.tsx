"use client";

import AppShell from "@/components/AppShell";
import RecentlyViewedItems from "@/components/RecentlyViewedItems";
import useAuth from "@/hooks/useAuth";

const UserPage = () => {
  const { user } = useAuth();

  return (
    <AppShell title="User profile">
      {user != null && <RecentlyViewedItems userID={user.uid} />}
    </AppShell>
  );
};

export default UserPage;
