import Input from "./Input";

const Text = ({ className, label, value, onChange, placeholder }) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Text;

Text.defaultProps = {
  className: '',
  label: '',
  value: '',
  onChange: () => {},
  placeholder: "",
};