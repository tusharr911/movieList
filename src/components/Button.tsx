import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type?: "button" | "reset" | "submit"; 
  className?: string;
  bgColor?: string;
  textColor?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  className = "",
  bgColor = "",
  textColor = "",
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={` ${bgColor} ${textColor} ${className}`}
      {...props}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
