import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataBankContext from '../../context/DataBankContext';
import useHttp from '../../hooks/useHttp';
import CustomInput from './CustomInput';
import BigText from '../../UI/BigText';
import classes from './DashboardForm.module.css';
import formValidator from '../../utils/formValidator';

const transformPrePostRooms = (roomId) => {
  return { category: roomId };
};

const DashboardHotelForm = ({ className }) => {
  const { bank, urls, reloadBank } = useContext(DataBankContext);
  const { sendRequest } = useHttp();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    name: '',
    type: '',
    city: '',
    address: '',
    distance: '',
    desc: '',
    price: '',
    photos: [],
    featured: false,
    rooms: [],
  });
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const validators = {
      numberTypeFields: ['price', 'distance'],
      booleanTypeFields: ['featured'],
    }
    const err = formValidator(formValue, validators);
    if (err) {
      alert(err);
      return;
    }
    const applyData = () => {
      reloadBank('hotels');
      return navigate('?method=update');
    };
    const opts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValue),
    };
    sendRequest(urls.hotels, applyData, opts);
  };

  return (
    <form className={className}>
      <CustomInput
        title="Name"
        name="name"
        type="basis"
        setFormValue={setFormValue}
      />
      <CustomInput
        title="Type"
        name="type"
        type="basis"
        setFormValue={setFormValue}
      />
      <CustomInput
        title="City"
        name="city"
        type="basis"
        setFormValue={setFormValue}
      />
      <CustomInput
        title="Address"
        name="address"
        type="basis"
        setFormValue={setFormValue}
      />
      <CustomInput
        title="Distance from City Center"
        name="distance"
        type="basis"
        setFormValue={setFormValue}
      />
      <CustomInput title="Title" type="basis" />
      <CustomInput
        title="Description"
        name="desc"
        type="basis"
        setFormValue={setFormValue}
      />
      <CustomInput
        title="Price"
        name="price"
        type="basis"
        setFormValue={setFormValue}
      />
      <CustomInput
        title="Images"
        name="photos"
        type="add-many"
        setFormValue={setFormValue}
      />
      <CustomInput
        title="Featured"
        name="featured"
        type="pick"
        options={['No', 'Yes']}
        setFormValue={setFormValue}
      />
      <BigText
        title="Rooms"
        name="rooms"
        setFormValue={setFormValue}
        transformPrePost={transformPrePostRooms}
        data={bank.rooms.data.rooms}
      />
      <button className={classes['submit-btn']} onClick={handleSubmit}>
        Send
      </button>
    </form>
  );
};
export default DashboardHotelForm;
