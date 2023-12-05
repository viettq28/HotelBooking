import { useState, useEffect } from 'react';
import useHttp from '../../hooks/useHttp';
import Container from '../../UI/Container';
import Card from '../../UI/Card';
import data from '../../data/type.json';
// Component render list các loại khách sạn
const Types = () => {
  const [data, setData] = useState([]);
  const { sendRequest } = useHttp();
  const types = ['Hotel', 'Apartment', 'Resort', 'Villa', 'Cabin'];

  useEffect(() => {
    const applyData = (data) => {
      setData(data.data);
    };
    sendRequest('http://localhost:5000/hotel/group-by/type', applyData);
  }, [sendRequest]);

  return (
    <Container className="my-5">
      <h4 className="fw-bold">Browse by property type</h4>
      <ul className="row m-0 px-0 py-2">
        {types.map((type, i) => {
          const totalProperties = data.find(elm => elm._id === type.toLowerCase())?.totalProperties || 0;
          return (
            <li key={type} className="col">
              <Card className="h-100 border-0">
                <img
                  src={`./images/type_${i + 1}.${i === 0 ? 'webp' : 'jpg'}`}
                  className="card-img-top h-75"
                  alt="..."
                />
                <div className="card-body px-0">
                  <h5 className="card-title fw-bold">{type}</h5>
                  <p className="card-text">{totalProperties} hotels</p>
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};
export default Types;
