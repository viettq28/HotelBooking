import { Link } from 'react-router-dom';
import classes from './DashboardSide.module.css'

const DashboardSide = ({ className }) => {
  return (
    <div className={`${classes['dashboard-side']} ${className}`}>
      <ul>
        <p>MAIN</p>
        <Link to='/dashboard'><li>Dashboard</li></Link>
      </ul>
      <ul>
        <p>LISTS</p>
        <Link to={'/dashboard/users?method=get'}><li>Users</li></Link>
        <Link to={'/dashboard/hotels?method=get'}><li>Hotels</li></Link>
        <Link to={'/dashboard/rooms?method=get'}><li>Rooms</li></Link>
        <Link to={'/dashboard/transactions?method=get'}><li>Transactions</li></Link>
      </ul>
      <ul>
        <p>NEW</p>
        <Link to={'/dashboard/hotels?method=update'}><li>New Hotel</li></Link>
        <Link to={'/dashboard/rooms?method=update'}><li>New Room</li></Link>
      </ul>
      <ul>
        <p>LOG OUT</p>
      </ul>
    </div>
  );
};
export default DashboardSide;
