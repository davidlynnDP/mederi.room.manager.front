import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FieldInputProps } from "formik";
import { useState } from "react";

interface PasswordFieldProps {
  label: string;
  fieldProps: FieldInputProps<any>;
  touched: boolean | undefined;
  error: string | undefined;
  placeholder?: string;
}

export const PasswordField = ({ label, fieldProps, touched, error, placeholder = "********" }: PasswordFieldProps) => {

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          {...fieldProps}
          className={`mt-1 w-full p-3 border rounded-lg ${touched && error ? 'border-red-500' : 'border-gray-300'}`}
          placeholder={placeholder}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>
      {touched && error ? (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      ) : null}
    </div>
  );
};
