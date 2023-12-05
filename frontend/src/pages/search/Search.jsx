import { useState, useEffect, useContext } from 'react';
import useHttp from '../../hooks/useHttp';
import SearchContext from '../../context/SearchContext';
import SearchPopup from '../../components/SearchPopup/SearchPopup';
import SearchList from '../../components/SearchList/SearchList';

// Page render SearchPopup và SearchList
const Search = () => {
  const [search] = useContext(SearchContext);
  const [availableHotels, setAvailableHotels] = useState([]);
  const { sendRequest } = useHttp();

  useEffect(() => {
    const applyData = (data) => {
      setAvailableHotels(data.availableHotels);
    };
    const opts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        city: search.city,
        startDate: search.startDate,
        endDate: search.endDate,
        maxPeople: +search.numAdult + +search.numChildren,
        numRooms: +search.numRooms,
      }),
    };
    sendRequest('http://localhost:5000/hotel/room-stats/', applyData, opts);
  }, [search, sendRequest]);
  return (
    <div className="container my-4">
      <div className="row h-auto">
        <SearchPopup search={search}/>
        <SearchList hotels={availableHotels}/>
      </div>
    </div>
  );
};

export default Search;
