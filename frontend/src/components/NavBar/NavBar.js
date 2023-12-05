import React from 'react';

import Container from '../../UI/Container';
import NavBarTop from './NavBarTop';
import NavBarBot from './NavBarBot';
// Render NavBar
const NavBar = () => {
  return (
    <div className='bg-custom-blue pb-5'>
      <Container>
        <NavBarTop />
        <NavBarBot />
      </Container>
    </div>
  );
};

export default NavBar;
