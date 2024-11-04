"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import useAuth from "@/hooks/useAuth";
import FlexColumn from "@/components/FlexColumn";
import Button from "@/components/Button";

const LoginPage = () => {
  useAuth({ redirect: "/products" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div style={{ margin: 8 }}>
      <form onSubmit={handleLogin}>
        <FlexColumn gap={8}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" label="Login" />
        </FlexColumn>
      </form>
    </div>
  );
};

export default LoginPage;
