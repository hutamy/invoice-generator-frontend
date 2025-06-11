import Input from "./Input";

const Number = ({ className, label, value, onChange, placeholder }) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <Input
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Number;

Number.defaultProps = {
  className: '',
  label: '',
  value: '',
  onChange: () => {},
  placeholder: "",
};