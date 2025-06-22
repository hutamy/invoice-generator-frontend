import Input from "./Input";

const Number = (props) => {
  return (
    <div className={props.componentclassname}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {props.label}
      </label>
      <Input
        name={props.name}
        type="number"
        value={props.value > 0 && props.value}
        onChange={props.onChange}
        {...props}
      />
      {props.error && (
        <p className="text-xs text-red-500 pt-1">{props.errormessage}</p>
      )}
    </div>
  );
};

export default Number;

Number.defaultProps = {
  componentclassname: "",
  label: "",
  value: "",
  onChange: () => {},
  error: false,
  name: "",
  errormessage: "",
};
