"use client";

import useAuth from "@/hooks/useAuth";
import style from "./components.module.css";
import Link from "next/link";
import Button from "./Button";

const AppBar = () => {
  const { logout, user } = useAuth();
  return (
    <div className={style.appBar}>
      <Link href="/products">All products</Link>
      <Link href="/profile">Profile</Link>
      <span style={{ margin: "auto" }} />
      <Button onClick={() => logout()} label="Logout" />
    </div>
  );
};

export default AppBar;
