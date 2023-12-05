import HotelCard from './HotelCard';
// Component render list và pass hotel data as props cho các component HotelCard
const SearchList = ({ hotels }) => {
  return (
    <ul className="col">
      {hotels.map((hotel) => {
        return (
          <li key={hotel.name}>
            <HotelCard {...hotel} />
          </li>
        );
      })}
    </ul>
  );
};
export default SearchList;
