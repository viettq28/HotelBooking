import Card from '../../UI/Card';
import Button from '../../UI/Button';

import classes from './DetailDesc.module.css';

// Render component từ title, desc và price
const DetailDesc = ({ title, desc, price, handleToggleBooking }) => {
  return (
    <div className={`row mt-4 px-1 ${classes['desc-container']}`}>
      <div className="col-9">
        <h4 className="fw-bolder">{title}</h4>
        <p>{desc}</p>
      </div>
      <div className="col">
        <Card className={`${classes['bg-card']} border-0 p-3`}>
          {/* <div className="card-title fw-bold text-secondary">
            Perfect for a 9-night stay!
          </div> */}
          {/* <p className="card-text">
            Located in the real heart of Krakow, this property has an excellent
            location score of 9.8!
          </p> */}
          <div className="fs-4 fw-bolder mb-3">
            ${price} <span className="fs-4 fw-light"> (1 nights)</span>
          </div>
            <Button title='Reserve or Book Now!' className="btn-primary w-100" onClick={handleToggleBooking}/>
        </Card>
      </div>
    </div>
  );
};
export default DetailDesc;
