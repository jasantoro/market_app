interface SelectProps {
  label: string;
  name: string;
  value: string;
  required?: boolean;
  options: { key: string; value: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectProps> = ({
  label,
  name,
  value,
  required,
  options,
  onChange,
}) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    className="w-full mb-2 px-3 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
  >
    <option value="" disabled>
      {label}
    </option>
    {options.map((o) => (
      <option key={o.key} value={o.key}>
        {o.value}
      </option>
    ))}
  </select>
);

export default SelectField;
