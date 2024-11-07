'use client';
import { InputHTMLAttributes } from "react";
import {classNames} from "@/utils/common";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
}

function Input({ id, label, disabled = false, required = false, ...props }: InputProps) {
  return (
    <div className={classNames(disabled ? 'opacity-50 pointer-events-none' : '', 'relative mobile:text-sm')}>
      {
        label ? (
          <label htmlFor={id} className="text-gray-700">
            {label}
            {required ? <span className="text-red-500 required-dot ml-1.5 align-middle">*</span> : <></>}
          </label>
        ) : <></>
      }
      <input id={id} type="text"
        className="w-full py-2 px-4 flex-1 mobile:text-sm rounded-lg border-1 appearance-none border border-gray-300 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        {...props} />
    </div>
  );
}

export default Input;