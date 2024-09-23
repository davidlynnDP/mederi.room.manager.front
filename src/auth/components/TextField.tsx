import { FieldInputProps } from "formik";

interface TextFieldProps {
  label: string;
  type: string;
  placeholder: string;
  fieldProps: FieldInputProps<any>;
  touched: boolean | undefined;
  error: string | undefined;
}

export const TextField = ({ label, type, placeholder, fieldProps, touched, error }: TextFieldProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        {...fieldProps}
        className={`mt-1 w-full p-3 border rounded-lg ${touched && error ? 'border-red-500' : 'border-gray-300'}`}
        placeholder={placeholder}
      />
      {touched && error ? (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      ) : null}
    </div>
  );
};
