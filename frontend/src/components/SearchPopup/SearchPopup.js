import Card from '../../UI/Card';
import InputField from '../../UI/InputField';
import Button from '../../UI/Button';

import classes from './SearchPopup.module.css';

const SearchPopup = ({search}) => {
  // Lấy context search từ root
  const inputFieldClasses = { wrapperClass: 'row mb-2', labelClass: 'mb-1' };
  const options = [
    'Min price per night',
    'Max price per night',
    'Adult',
    'Children',
    'Rooms',
  ];
  
  return (
    // Render SearchPopup gồm các input được set defaultValue từ search
    <Card className="card text-bg-warning col-3 h-50 me-5">
      <div className="card-body">
        <h4 className="card-title fw-bold text-secondary mb-3">Search</h4>
        <InputField
          title="Destination"
          {...inputFieldClasses}
          value={search.city}
        />

        <InputField
          title="Check-in date"
          {...inputFieldClasses}
          value={`${search.startDate} - ${search.endDate}`}
        />

        <div className="mb-2">
          <p className="mb-2">Option</p>
          <div className={`container ${classes['input-grid']}`}>
            {options.map((option, i) => {
              return (
                <InputField
                  key={i}
                  title={option}
                  type="number"
                  value={`${search[`num${option}`]}`}
                  wrapperClass="row mb-2"
                  labelClass="mb-2 col-9"
                  inputClass="col"
                />
              );
            })}
          </div>
        </div>
        <Button title="Search" className={`${classes.btn} border-0 w-100`} />
      </div>
    </Card>
  );
};

export default SearchPopup;
