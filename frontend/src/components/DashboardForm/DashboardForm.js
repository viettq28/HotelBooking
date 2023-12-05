import { useParams } from 'react-router-dom';
import classes from './DashboardForm.module.css';
import DashboardHotelForm from './DashboardHotelForm';
import DashboardRoomForm from './DashboardRoomForm';

const DashboardForm = () => {
  const { section } = useParams();

  switch (section) {
    case 'hotels':
      return (
        <>
          <div className={classes['title']}>Add New Hotel</div>
          <DashboardHotelForm className={classes['form']} />
        </>
      );
    case 'rooms':
      return (
        <>
          <div className={classes['title']}>Add New Room</div>
          <DashboardRoomForm className={classes['form']} />
        </>
      );
    default:
      return;
  }
};
export default DashboardForm;
