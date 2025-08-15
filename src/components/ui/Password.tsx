"use client";
import Image from "next/image";
import { useState } from "react";

type PasswordProp = {
  name: string;
  id: string;
  value?: string;
  placeholder?: string;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<any, HTMLInputElement>) => void;
  className?: string;
  hasError?: boolean; // New prop to indicate error state
};

const Password = ({ 
  name, 
  id, 
  value, 
  placeholder, 
  required, 
  onBlur, 
  onChange, 
  className = "", 
  hasError = false // Default to false 
}: PasswordProp) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<any, HTMLInputElement>) => {
    setIsFocused(false);
    onBlur(e);
  };

  return (
    <div className="w-full relative">
      <input
        type={isPasswordVisible ? "text" : "password"}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        required={required}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        className={`w-full ${className}`}
      />
      <button 
        type="button" 
        onClick={togglePasswordVisibility} 
        className="absolute right-4 top-1/2 transform -translate-y-1/2"
      >
        {isPasswordVisible ? (
          <Image
            width={26}
            height={26}
            src={
              hasError 
                ? "/images/eye_focused_err.svg" // Red eye icon for errors
                : (isFocused ? "/images/eye_focused.svg" : "/images/eye.svg")
            }
            alt="Hide password"
            className="w-5 h-5 lg:w-[24px] lg:h-[24px]"
          />
        ) : (
          <Image
            width={26}
            height={26}
            src={
              hasError 
                ? "/images/eye_close_focused_err.svg" // Red eye icon for errors
                : (isFocused ? "/images/eye_close_focused.svg" : "/images/eye_close.svg")
            }
            alt="Show password"
            className="w-5 h-5 2xl:w-[24px] 2xl:h-[24px]"
          />
        )}
      </button>
    </div>
  );
};

export default Password;
