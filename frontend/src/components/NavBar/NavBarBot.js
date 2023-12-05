import classes from './NavBarBot.module.css';

import data from '../../data/navBar';
// NavBarBot là menu page
const NavBarBot = () => {
  return (
    <ul className="nav col-12 col-lg-auto my-2 my-md-0 text-small">
      {data.map((elm, i) => (
        <li key={elm.icon + i} className={`${elm.active && classes.active} nav-link text-white`}>
          <i className={`fa ${elm.icon} me-2`}></i>
          {elm.type}
        </li>
      ))}
    </ul>
  );
};

export default NavBarBot;
