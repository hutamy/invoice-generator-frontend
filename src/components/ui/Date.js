import Input from "./Input";

const Date = ({ className, label, value, onChange, placeholder }) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <Input
        type="date"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Date;

Date.defaultProps = {
  className: "",
  label: "",
  value: "",
  onChange: () => {},
  placeholder: "",
};
