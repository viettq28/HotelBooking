import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';

import Container from '../../UI/Container';
import DetailHeader from '../../components/Detail/DetailHeader';
import DetailPics from '../../components/Detail/DetailPics';
import DetailDesc from '../../components/Detail/DetailDesc';

import Booking from '../../components/Booking/Booking';

// Page này render các components trong Detail folders
const Detail = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState({});
  const [isBooking, setIsBooking] = useState(false);
  const navigate = useNavigate();
  const { sendRequest } = useHttp();

  useEffect(() => {
    const applyData = (data) => {
      const price = Math.min(
        ...data.data.hotel.rooms.map((room) => room.category.price)
      );
      setHotel({ price, ...data.data.hotel });
    };
    sendRequest(`http://localhost:5000/hotel/${id}?isPopulate=*`, applyData);
  }, [sendRequest, id]);

  const handleToggleBooking = () => {
    if (!localStorage.getItem('TOKEN')) {
      return navigate('/auth/login')
    };
    setIsBooking((isBooking) => !isBooking);
  };

  return (
    <Container className="my-5">
      <DetailHeader {...hotel} handleToggleBooking={handleToggleBooking} />
      <DetailPics photos={hotel.photos} />
      <DetailDesc
        title={hotel.name}
        desc={hotel.desc}
        price={hotel.price}
        handleToggleBooking={handleToggleBooking}
      />
      {isBooking && <Booking rooms={hotel.rooms} hotelId={id} />}
    </Container>
  );
};

export default Detail;
