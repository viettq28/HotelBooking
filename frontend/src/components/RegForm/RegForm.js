import React from 'react';

import Container from '../../UI/Container';
import Button from '../../UI/Button';
// Component RegForm render title, input email và button subscribe
const RegForm = () => {
  return (
    <div className="bg-custom-blue pb-5">
      <Container>
        <div className="text-white text-center py-4">
          <h1 className='mb-4'>Save time, save money</h1>
          <p>Sign up and we'll send the best deals to you</p>
          <div className="d-flex w-50 m-auto justify-content-between">
            <input className="form-control p-3 me-3" placeholder="Your Email"></input>
            <Button title='Subscribe' className='btn-primary'/>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RegForm;
