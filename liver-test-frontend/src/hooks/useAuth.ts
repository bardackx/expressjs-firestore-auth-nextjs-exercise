import { use, useCallback, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";

const useAuth = (options?: { redirect: string }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [setUser, setLoading]);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, [setUser]);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user == null) {
      router.push("/login");
    } else if (options?.redirect) {
      router.push(options.redirect);
    }
  }, [loading, user]);

  return { user, loading, logout, isAuthenticated: user != null };
};

export default useAuth;
