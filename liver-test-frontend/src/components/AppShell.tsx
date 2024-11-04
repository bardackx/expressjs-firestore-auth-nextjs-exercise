"use client";

import style from "./components.module.css";
import AppBar from "./AppBar";

const AppShell = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  return (
    <div className={style.appShell}>
      <AppBar />
      {title && <h1>{title}</h1>}
      {children}
    </div>
  );
};

export default AppShell;
