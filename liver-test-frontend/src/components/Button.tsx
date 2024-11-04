"use client";

import style from "./components.module.css";

const Button = (
  {
    onClick,
    label,
    type,
  }: {
    onClick?: (e: React.MouseEvent) => void;
    label: string;
    type?: "submit" | "button" | "reset";
  },
) => {
  return (
    <button
      className={style.button}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
