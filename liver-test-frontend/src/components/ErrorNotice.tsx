"use client";

import style from "./components.module.css";

const ErrorNotice = (
  {
    error,
  }: {
    error: string | Error;
  },
) => {
  return (
    <div className={style.errorNotice}>
      {error instanceof Error && <p>{error.message}</p>}
      {typeof error === "string" && <p>{error}</p>}
    </div>
  );
};

export default ErrorNotice;
