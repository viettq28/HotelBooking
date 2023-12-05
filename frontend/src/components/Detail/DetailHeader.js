import Button from '../../UI/Button';
import classes from '../SearchList/HotelCard.module.css';

// Render component từ name, address, distance và price
const DetailHeader = ({ name, address, distance, price, handleToggleBooking }) => {
  return (
    <div className="row">
      <div className="col-9">
        <h4 className="fw-bolder">{name}</h4>
        <p>
          <i className="fa fa-map-marker me-2"></i>
          {address}
        </p>
        <p className="text-primary">{`Excellent location - ${distance}m from center`}</p>
        <p className="text-custom-green">{`Book a stay over ${price} at this property and get a free airport taxi`}</p>
      </div>
      <div className="col">
        <Button
          className={`btn-primary ${classes.btn}`}
          title="Reserve or Book Now!"
          onClick={handleToggleBooking}
        />
      </div>
    </div>
  );
};
export default DetailHeader;
