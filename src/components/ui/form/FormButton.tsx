import React from 'react';
import { ButtonHTMLAttributes, ReactNode } from "react";

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

function FormButton({ children, ...props }: FormButtonProps) {
  return (
    <button
        className="rounded-full w-full h-12 mobile:h-10 py-2 px-4 font-medium bg-primary text-white shadow-sm mobile:text-sm"
      {...props}
    >
      {children}
    </button>
  );
}

export default FormButton;