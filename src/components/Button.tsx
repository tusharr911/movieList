function Button({
  children,
  type = "button",
  className = "",
  bgColor = "",
  textColor = "",
  disabled=false,
  ...props
}) {
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
}

export default Button;
