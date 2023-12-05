import classes from './BookingRoomList.module.css';

const BookingRoomList = ({ availableRooms, searchValue, setSearchValue }) => {
  const { roomSelections } = searchValue;

  const handleChange = (e) => {
    const roomId = e.target.dataset.dad;
    const roomNumber = availableRooms
      .find((room) => room._id === roomId)
      .availableRoomNumbers.includes(+e.target.value)
      ? +e.target.value
      : null;

    if (roomId) {
      const isBooked = roomSelections[roomId].includes(roomNumber);
      const getRoomSelections = (isBooked) => {
        if (isBooked) {
          return {
            roomSelections: {
              ...roomSelections,
              [roomId]: roomSelections[roomId].filter((n) => n !== roomNumber),
            },
          };
        }
        return {
          roomSelections: {
            ...roomSelections,
            [roomId]: [...roomSelections[roomId], roomNumber],
          },
        };
      };
      setSearchValue({
        ...searchValue,
        ...getRoomSelections(isBooked),
      });
    }
  };
  return (
    <>
      <h3>Select Rooms</h3>
      <div className={`${classes['container']}`}>
        {availableRooms.map((room) => {
          return (
            <div
              className="d-flex col-md-6 gap-3 mb-3 pt-4 pb-1"
              key={room._id}
            >
              <div className="col-md-8">
                <div className={classes['title']}>{room.title}</div>
                <div className={classes['desc']}>{room.desc}</div>
                <div className={classes['max-people']}>
                  Max people: <b>{room.maxPeople}</b>
                </div>
                <div className={classes['price']}>{`$${room.price}`}</div>
              </div>
              <div className="d-flex col-md-3 gap-2 mt-4">
                {room.availableRoomNumbers.map((number) => {
                  return (
                    <div key={number} className="d-flex flex-column">
                      <label htmlFor={`${number}${room.title}`}>{number}</label>
                      <input
                        type="checkbox"
                        id={`${number}${room.title}`}
                        name={`${number}${room.title}`}
                        value={number}
                        data-dad={room._id}
                        checked={roomSelections[room._id].includes(number)}
                        onChange={handleChange}
                      ></input>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default BookingRoomList;
