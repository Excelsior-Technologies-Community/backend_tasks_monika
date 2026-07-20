const InputField = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  accept,
}) => {
  return (
    <div className="mb-2">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <input
        id={name}
        type={type}
        name={name}
        {...(type !== "file" ? { value } : {})}
        placeholder={placeholder}
        onChange={onChange}
        accept={accept}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default InputField;