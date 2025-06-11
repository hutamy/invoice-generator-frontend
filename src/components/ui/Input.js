const Input = ({ type, placeholder, value, onChange, className }) => {
  return (
    <input
      type={type}
      className={
        "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700 placeholder-gray-200 " +
        className
      }
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
export default Input;

Input.defaultProps = {
  type: "text",
  placeholder: "",
  value: "",
  className: "",
  onChange: () => {},
};
