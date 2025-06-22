import Input from "./Input";

const Text = (props) => {
  return (
    <div className={props.componentclassname}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {props.label}
      </label>
      <Input
        name={props.name}
        type="text"
        value={props.value}
        onChange={props.onChange}
        {...props}
      />
      {props.error && (
        <p className="text-xs text-red-500 pt-1">{props.errormessage}</p>
      )}
    </div>
  );
};

export default Text;

Text.defaultProps = {
  componentclassname: "",
  label: "",
  value: "",
  onChange: () => {},
  error: false,
  name: "",
  errormessage: "",
};
