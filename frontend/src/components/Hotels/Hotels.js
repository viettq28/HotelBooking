import { useState, useEffect } from 'react';
import useHttp from '../../hooks/useHttp';
import { Link } from 'react-router-dom';

import Container from '../../UI/Container';
import Card from '../../UI/Card';
// Component render list các hotel từ data
const Hotels = () => {
  const [data, setData] = useState([]);
  const { sendRequest } = useHttp();

  useEffect(() => {
    const applyData = (data) => {
      setData(data.data.hotels);
    };
    sendRequest('http://localhost:5000/hotel/top-rating', applyData);
  }, [sendRequest]);

  return (
    <Container className="my-5">
      <h4 className="fw-bold">Homes guests love</h4>
      <ul className="row m-0 px-0 py-2">
        {data.map((hotel) => {
          return (
            <li key={hotel.name} className="col">
              <Card className="h-100 border-0">
                <img
                  src={hotel.photos[0]}
                  className="card-img-top h-75"
                  alt="..."
                />
                <div className="card-body h-auto px-0">
                  {/* Dùng Link để đến /detail mà không reload page */}
                  <Link to={`detail/${hotel._id}`}>
                    <h5 className="card-title mb-3 fw-bold text-dark">
                      {hotel.name}
                    </h5>
                  </Link>
                  <p className="card-text mb-2">{hotel.city}</p>
                  <p className="card-text fw-bold">
                    Starting from $
                    {hotel.rooms
                      .map((room) => room.category.price)
                      .reduce((min, price) => {
                        price <= min && (min = price);
                        return min;
                      })}
                  </p>
                  <div className="card-text d-flex">
                    <div className="bg-custom-blue text-white p-1 me-2">
                      {hotel.rating}
                    </div>
                    <div className="p-1">{hotel.type}</div>
                  </div>
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};
export default Hotels;
