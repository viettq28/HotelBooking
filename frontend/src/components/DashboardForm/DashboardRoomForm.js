import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataBankContext from '../../context/DataBankContext';
import useHttp from '../../hooks/useHttp';
import CustomInput from './CustomInput';
import classes from './DashboardForm.module.css';
import formValidator from '../../utils/formValidator';


const DashboardRoomForm = ({ className }) => {
  const { bank, urls, reloadBank } = useContext(DataBankContext);
  const { sendRequest } = useHttp();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    title: '',
    price: '',
    maxPeople: '',
    desc: '',
    roomNumbers: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const validators = {
      numberTypeFields: ['price', '[roomNumbers]', 'maxPeople'],
    }
    const err = formValidator(formValue, validators);
    if (err) {
      alert(err);
      return;
    }
    const applyData = () => {
      reloadBank('rooms');
      return navigate('?method=update');
    };
    const opts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValue),
    };
    sendRequest(urls.rooms, applyData, opts);
  };

  return (
    <form className={className}>
      <CustomInput
        title="Title"
        name="title"
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
        title="Max People"
        name="maxPeople"
        type="basis"
        setFormValue={setFormValue}
      />
      <CustomInput
        title="Description"
        name="desc"
        type="basis"
        setFormValue={setFormValue}
      />
      <CustomInput
        title="Rooms"
        name="roomNumbers"
        type="add-many"
        className='w-75'
        setFormValue={setFormValue}
      />
      <CustomInput
        title="Choose a hotel"
        name="featured"
        type="pick"
        options={bank.hotels.data.hotels.map(hotel => hotel.name)}
      />
      <button className={classes['submit-btn']} onClick={handleSubmit}>
        Send
      </button>
    </form>
  );
};
export default DashboardRoomForm;
