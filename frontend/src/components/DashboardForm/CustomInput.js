import classes from './CustomInput.module.css';

const CustomInput = ({
  type,
  name,
  title,
  options,
  setFormValue,
  className,
}) => {
  const handleChange = (e) => {
    const value =
      type === 'add-many'
        ? e.target.value.split(/\s*(?:\r?\n|,|$)\s*/)
        : e.target.value;
    setFormValue((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const attributes = {
    name: name,
    id: name,
    className: `${classes[type]} ${className}`,
    onChange: setFormValue && handleChange,
  };
  return (
    <div className={classes['field']}>
      <label htmlFor={name}>{title}</label>
      {type === 'add-many' ? (
        <textarea
          {...attributes}
          placeholder='Separating data with "," or new line'
        />
      ) : type === 'pick' ? (
        <select {...attributes}>
          {options.map((option) => {
            return (
              <option
                key={option}
                value={
                  option === 'Yes' ? true : option === 'No' ? false : option
                }
              >
                {option}
              </option>
            );
          })}
        </select>
      ) : (
        <input {...attributes} />
      )}
    </div>
  );
};

export default CustomInput;
