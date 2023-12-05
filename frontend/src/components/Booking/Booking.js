import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchContext from '../../context/SearchContext';
import LoginUserContext from '../../context/LoginUserContext';
import DataBankContext from '../../context/DataBankContext';
import useHttp from '../../hooks/useHttp';
import BookingReserve from './BookingReserve';
import BookingRoomList from './BookingRoomList';
import Container from '../../UI/Container';
import Button from '../../UI/Button';
import BookingDate from './BookingDate';
import formValidator from '../../utils/formValidator';
import classes from './Booking.module.css';

const getAvailableRooms = (
  rooms,
  startDate = new Date(),
  endDate = new Date()
) => {
  return rooms.map((room) => {
    const { roomNumbers, ...rest } = room.category;
    const getAvailableRoomNumbers = () => {
      if (!room.unavailable.length) {
        return [...roomNumbers];
      }
      return roomNumbers.reduce((acc, number) => {
        const foundNumber = room.unavailable.find((r) => r.number === number);
        const getTime = (time) => {
          return new Date(time).getTime();
        };
        const isAvailableDate =
          getTime(endDate) < getTime(foundNumber?.startDate) ||
          getTime(startDate) > getTime(foundNumber?.endDate);
        if (!foundNumber || (!!foundNumber && isAvailableDate)) {
          acc.push(number);
        }
        return acc;
      }, []);
    };
    return { ...rest, availableRoomNumbers: getAvailableRoomNumbers() };
  });
};

const Booking = ({ rooms, hotelId }) => {
  const [search] = useContext(SearchContext);
  const curUser = useContext(LoginUserContext);
  const { reloadBank } = useContext(DataBankContext);
  const [searchValue, setSearchValue] = useState({
    startDate: search.startDate || new Date(),
    endDate: search.endDate || new Date(),
    fullName: curUser?.fullName || '',
    email: curUser?.email || '',
    phoneNumber: curUser?.phoneNumber || '',
    cardNumber: '',
    roomSelections: getAvailableRooms(rooms).reduce((acc, room) => {
      acc[room._id] = [];
      return acc;
    }, {}),
    payment: 'cash',
  });
  const [availableRooms, setAvailableRooms] = useState(
    getAvailableRooms(rooms)
  );
  const { sendRequest } = useHttp();
  const navigate = useNavigate();
  const { startDate, endDate } = searchValue;
  const calculateBill = () => {
    const diffDays =
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 3600 * 24) +
      1;
    const oneDayPrice = Object.entries(searchValue.roomSelections).reduce(
      (acc, [roomId, roomList]) => {
        acc +=
          availableRooms.find((room) => room._id === roomId).price *
          roomList.length;
        return acc;
      },
      0
    );
    return oneDayPrice * diffDays;
  };
  const handleSetPaymentMethod = (e) => {
    setSearchValue({ ...searchValue, payment: e.target.value });
  };
  const handleReserve = () => {
    const reservedRooms = Object.entries(searchValue.roomSelections).reduce(
      (acc, [category, number]) => {
        if (number.length > 0) acc.push({ category, number });
        return acc;
      },
      []
    );
    const token = localStorage.getItem('TOKEN');
    if (!reservedRooms.length) {
      alert('Please select a room to book!!!');
      return;
    }
    if (!token) {
      alert('Please login first !!!');
      return;
    }

    const transaction = {
      user: curUser.username,
      hotel: hotelId,
      rooms: reservedRooms,
      startDate,
      endDate,
      price: calculateBill(),
      payment: searchValue.payment,
      status: 'booked',
    };
    const updatedUser = {
      email: searchValue.email,
      fullName: searchValue.fullName,
      phoneNumber: searchValue.phoneNumber,
    };
    const validators = {numberTypeFields: ['phoneNumber']};
    const err = formValidator(updatedUser, validators);
    if (err) {
      window.alert(err);
      return;
    }
    const handleError = (err) => {
      window.alert(err)
    }

    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    };

    const applyData = () => {
      sendRequest(
        `http://localhost:5000/user/${curUser._id}`,
        () => {
          reloadBank('transactions');
          return navigate('/transaction');
        },
        { ...opts, body: JSON.stringify(updatedUser) },
        handleError
      );
    };
    
    sendRequest(`http://localhost:5000/${token}/transaction`, applyData, opts, handleError);
  };

  return (
    <Container className={`container ${classes['container']}`}>
      <div className={`row ${classes['row1']}`}>
        <BookingDate
          rooms={rooms}
          dateRange={[startDate, endDate]}
          setSearchValue={setSearchValue}
          setAvailableRooms={setAvailableRooms}
          getAvailableRooms={getAvailableRooms}
        />
        <BookingReserve
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </div>
      <div className="row">
        <BookingRoomList
          availableRooms={availableRooms}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </div>
      <div className="row">
        <h3>{`Total Bill: $${calculateBill()}`}</h3>
        <div className="d-flex">
          <select
            defaultValue=""
            className={classes['payment-method']}
            onChange={handleSetPaymentMethod}
          >
            <option value="" disabled>
              Select Payment Method
            </option>
            <option value="credit card">Credit Card</option>
            <option value="cash">Cash</option>
          </select>
          <Button
            className={classes['reserve-btn']}
            title="Reserve Now"
            onClick={handleReserve}
          />
        </div>
      </div>
    </Container>
  );
};
export default Booking;
