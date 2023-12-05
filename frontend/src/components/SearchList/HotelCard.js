import { Link } from 'react-router-dom';
import Card from '../../UI/Card';
import Button from '../../UI/Button';

import classes from './HotelCard.module.css';
// Render các card detail của hotel từ data
const HotelCard = (props) => {
  return (
    <Link to={`/detail/${props._id}`}>
      <Card className="mb-3">
        <div className="card-body row">
          <div className={`col-4 ${classes['img-container']}`}>
            <img
              src={props.photos[0]}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>

          <div className="col-5">
            <h4 className="card-title text-primary fw-bold">{props.name}</h4>
            <p className="carr-subtitle mb-2">{props.distance}m from center</p>
            <div className={classes['tag-container']}>
              {props.rooms.map((room) => {
                return (
                  <p key={room.title} className={classes['tag']}>
                    {room.title}
                  </p>
                );
              })}
            </div>
            <p className="fw-bold">{props.rooms[0].desc}</p>
            {/* <p className="card-text">{props.type}</p> */}
            <div className={`${classes['noti-cancel']}`}>
              <p className="fw-bold mb-2">Free cancellation</p>
              <p className="">
                You can cancel later, so lock in this great price today!
              </p>
            </div>
            <p className="card-text"></p>
          </div>

          <div className="col">
            <div className="d-flex justify-content-between fw-bold h-50">
              <div
                className="col-10 text-end pe-3"
                style={{ fontSize: '1.2em' }}
              >
                Rating
              </div>
              <div className="col">
                <div
                  className={classes.square}
                  data-before={props.rating}
                ></div>
              </div>
            </div>
            <div className="h-50 text-end d-flex flex-column justify-content-end">
              <h3>${props.cheapestPrice}</h3>
              <div className="text-secondary mb-2" style={{ fontSize: 12 }}>
                Includes taxes and fees
              </div>
              <div>
                <Button
                  title="See availability"
                  className={`btn-primary ${classes.btn}`}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default HotelCard;
