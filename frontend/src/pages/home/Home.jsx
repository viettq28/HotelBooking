import Header from '../../components/Header/Header';
import Cities from '../../components/Cities/Cities';
import Types from '../../components/Types/Types';
import Hotels from '../../components/Hotels/Hotels';

// Page này render components Header, Types, Hotels, Cities
const Home = () => {
  return (
    <>
      <Header />
      <Cities />
      <Types />
      <Hotels />
    </>
  );
};

export default Home;
