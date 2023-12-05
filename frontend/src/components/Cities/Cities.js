import { useState, useEffect } from 'react';
import useHttp from '../../hooks/useHttp';
import Container from '../../UI/Container';
import Card from '../../UI/Card';

const Cities = () => {
  const [data, setData] = useState([]);
  const {sendRequest} = useHttp();
  const cities = ['Ha Noi', 'Ho Chi Minh', 'Da Nang'];
  useEffect(() => {
    const applyData = (data) => {
      setData(data.data);
    }
    sendRequest('http://localhost:5000/hotel/group-by/city', applyData);
  }, [sendRequest]);
  return (
    <Container className="my-5">
      <ul className="row m-0 px-0 py-2">
        {cities.map((city) => {
          const totalProperties = data.find(elm => elm._id === city)?.totalProperties || 0;
          return (
            <li key={city} className="col" style={{height: '20em'}}>
              <Card className='h-100'>
                <img src={`./cities/${city}.jpg`} className="h-100 card-img object-fit-cover" alt="..." />
                <div className="card-img-overlay bg-black opacity-25"></div>
                <div className="card-img-overlay d-flex text-white">
                  <div className="card-body align-self-end">
                    <h3 className="card-text">{city}</h3>
                    <h4 className="card-text">{`${totalProperties} properties`}</h4>
                  </div>
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};
export default Cities;
