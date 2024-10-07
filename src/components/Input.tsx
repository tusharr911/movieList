import React, { useId, ForwardedRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const Input = React.forwardRef(function Input(
  { type = "text", label, className = "", ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input id={id} type={type} className={`${className}`} ref={ref} {...props} />
    </div>
  );
});

export default Input;
