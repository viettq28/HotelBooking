import NavBarTop from '../../components/NavBar/NavBarTop';
import DashboardSide from '../../components/DashboardSide/DashboardSide';
import DashboardMain from '../../components/DashboardMain/DashboardMain';

import classes from './Dashboard.module.css';
import Container from '../../UI/Container';

const Dashboard = () => {
  return (
    <>
      <div className='bg-custom-blue'>
        <Container>
          <NavBarTop />
        </Container>
      </div>
      <div className={`p-3 ${classes['container']}`}>
        <div className={`${classes['row']}`}>
          <div className="col-md-2">Admin Page</div>
          <div className="col-md-10"></div>
        </div>
        <div className={`${classes['row']}`}>
          <DashboardSide className="col-md-2" />
          <DashboardMain />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
