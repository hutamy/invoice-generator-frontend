const Input = (props) => {
  return (
    <input
      name={props.name}
      type={props.type}
      className={
        props.error
          ? "w-full px-3 py-2 border border-red-500 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-gray-700 placeholder-gray-200 " +
            props.inputclassname
          : "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-700 placeholder-gray-200 " +
            props.inputclassname
      }
      value={props.value}
      onChange={props.onChange}
      {...props}
    />
  );
};
export default Input;

Input.defaultProps = {
  name: "",
  type: "text",
  value: "",
  inputclassname: "",
  onChange: () => {},
  error: false,
};
