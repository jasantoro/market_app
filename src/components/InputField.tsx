interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  required?: boolean;
  full?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputProps> = ({
  label,
  name,
  value,
  required,
  full = true,
  onChange,
  type = "text",
}) => (
  <input
    type={type}
    name={name}
    placeholder={label}
    value={value}
    onChange={onChange}
    required={required}
    className={`${
      full ? "w-full" : ""
    } mb-2 px-3 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400`}
  />
);

export default InputField;
