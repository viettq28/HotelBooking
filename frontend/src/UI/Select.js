import classes from './Select.module.css';

const Select = ({ defaultValue, placeholder, options, ...handler }) => {
  return (
    <select
      className={classes['select']}
      defaultValue={defaultValue}
      onChange={handler.handleChange}
      onBlur={handler.handleBlur}
    >
      {placeholder && <option value='' disabled>{placeholder}</option>}
      {Object.entries(options).map(([id, value]) => {
        return (
          <option key={id} value={id}>
            {value}
          </option>
        );
      })}
    </select>
  );
};
export default Select;
