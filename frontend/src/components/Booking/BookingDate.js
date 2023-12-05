import DateRangeComponent from '../../utils/DateRange';
import classes from './BookingDate.module.css';

const BookingDate = ({
  rooms,
  dateRange,
  setSearchValue,
  setAvailableRooms,
  getAvailableRooms,
}) => {

  const handleDateChangeValues = (startDate, endDate) => {
    const availableRooms = getAvailableRooms(rooms, startDate, endDate);
    setSearchValue((prev) => {
      return {
        ...prev,
        startDate,
        endDate,
        roomSelections: availableRooms.reduce((acc, room) => {
          acc[room._id] = [];
          return acc;
        }, {}),
      };
    });
    setAvailableRooms(availableRooms);
  };

  return (
    <div className="col-md-5 ps-0 pe-5">
      <h3>Dates</h3>
      <DateRangeComponent
        className={classes['datepicker']}
        curRange={dateRange}
        getChangeValue={handleDateChangeValues}
      />
    </div>
  );
};
export default BookingDate;
