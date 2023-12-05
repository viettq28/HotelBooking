import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchContext from '../context/SearchContext';
import LoginUserContextProvider from '../context/LoginUserContextProvider';

import NavBar from '../components/NavBar/NavBar';
import RegForm from '../components/RegForm/RegForm';
import Footer from '../components/Footer/Footer';
// Provide context search context cho toàn bộ app để tái sử dụng
const Root = () => {
  const [searchValue, setSearchValue] = useState({
    city: '',
    startDate: null,
    endDate: null,
    numAdult: '',
    numChildren: '',
    numRooms: '',
    'numMin price per night': '',
    'numMax price per night': '',
  });

  // NavBar, RegForm, Footer sẽ cố định, Outlet render các page Home, Search, Detail tùy theo path Url
  return (
    <SearchContext.Provider value={[searchValue, setSearchValue]}>
      <NavBar />
      <Outlet />
      <RegForm />
      <Footer />
    </SearchContext.Provider>
  );
};

export default Root;
