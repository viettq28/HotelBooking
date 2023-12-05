import React from 'react';


import Container from '../../UI/Container';
import Title from './Title';
import SearchField from './SearchField';

// Header chứa component Title và SearchField
const Header = () => {
  return (
    <div className='bg-custom-blue position-relative pb-5'>
      <Container>
        <Title />
        <SearchField />
      </Container>
    </div>
  );
};

export default Header;