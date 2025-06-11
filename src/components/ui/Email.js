import Input from "./Input";

const Email = ({ className, label, value, onChange, placeholder }) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <Input
        type="email"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Email;

Email.defaultProps = {
  className: "",
  label: "",
  value: "",
  onChange: () => {},
  placeholder: "",
};
