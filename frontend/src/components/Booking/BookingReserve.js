import InputField from "../../UI/InputField";
import classes from './BookingReserve.module.css'

const BookingReserve = ({searchValue, setSearchValue}) => {
  const formFields = ['fullName', 'email', 'phoneNumber', 'cardNumber'];
  const handleChangeUserInfo = (e) => {
    setSearchValue({ ...searchValue, [e.target.name]: e.target.value });
  };
  return (
    <form className={`col-md-7 pe-0 ${classes['form']}`}>
      <h3>Reserve Info</h3>
      {formFields.map((field) => {
        const capitalize = field
          .replace(/([A-Z])/g, ' $1')
          .replace(/^([a-z])/, (match) => match.toUpperCase());
        return (
          <InputField
            wrapperClass="mb-4"
            key={field}
            name={field}
            title={`Your ${capitalize}:`}
            id={field}
            placeholder={capitalize}
            value={searchValue[field]}
            handleChange={handleChangeUserInfo}
          />
        );
      })}
    </form>
  );
};
export default BookingReserve;
