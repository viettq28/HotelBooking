import { useContext } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import DataBankContext from '../../context/DataBankContext';
import ListCard from './ListCard';
import ListInfo from './ListInfo';
import NoData from '../../UI/NoData';
import DashboardForm from '../DashboardForm/DashboardForm';
import Spinner from '../../UI/Spinner';

const DashboardMain = ({ className }) => {
  const { isInitial, bank } = useContext(DataBankContext);
  const { section = 'transactionsLimit' } = useParams();
  const [searchParams] = useSearchParams();
  const method = searchParams.get('method');
  const data = bank?.[section]?.data?.[section.replace(/(Limit)$/, '')] || {};

  const isUpdating =
    method === 'update' ? searchParams.get('isUpdating') : false;

  return (
    <div className={`p-3 col-md-10 ${className}`}>
      {isInitial ? (
        <Spinner />
      ) : isUpdating ? (
        <DashboardForm />
      ) : (
        <>
          {!method && <ListCard />}
          {data.length ? <ListInfo
            key={section}
            title={
              method
                ? `${section.replace(/^[a-z]/, (char) =>
                    char.toUpperCase()
                  )} List`
                : 'Lastest Transactions'
            }
            listType={method}
            data={data}
            section={section}
          /> : <NoData title={`No ${section.replace(/(Limit)$/, '')} yet !!!`}/>}
        </>
      )}
    </div>
  );
};
export default DashboardMain;
