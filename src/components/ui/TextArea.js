const TextArea = ({ className, label, rows, value, onChange, placeholder }) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700 placeholder-gray-200"
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default TextArea;

TextArea.defaultProps = {
  className: '',
  label: '',
  rows: 2,
  value: '',
  onChange: () => {},
  placeholder: '',
};