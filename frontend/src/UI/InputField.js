const Input = (props) => {
  return (
    <input
      type={props.type ? props.type : "text"}
      className={`form-control ${props.className}`}
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      aria-label={props.ariaLabel}
      onChange={props.handleChange}
      defaultValue={props.value}
    />
  );
};

const InputField = (props) => {
  return (
    <div className={props.wrapperClass}>
      <label htmlFor={props.id} className={`form-label ${props.labelClass}`}>
        {props.title}
      </label>
      <Input {...props} />
    </div>
  );
};

export { Input };
export default InputField;
