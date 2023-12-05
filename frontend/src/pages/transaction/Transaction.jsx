import { useContext } from 'react';
import Container from '../../UI/Container';
import classes from './Transaction.module.css';
import DataBankContext from '../../context/DataBankContext';
import NoData from '../../UI/NoData';
import Label from '../../UI/Label';
import transformData from '../../utils/transformData';

const Transaction = () => {
  const { bank } = useContext(DataBankContext);
  const transactions = bank?.transactions?.data.transactions;

  return (
    <Container className="mx-auto my-5">
      {transactions ? (
        <>
          <h4 className='fw-bold'>Your Transactions</h4>
          <table className={classes['table']}>
            <thead>
              <tr>
                <th>#</th>
                <th>Hotel</th>
                <th>Room</th>
                <th>Date</th>
                <th>Price</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transformData(transactions, 'transactions').map(
                (transaction, i) => {
                  return (
                    <tr key={i}>
                      <td>{i}</td>
                      <td>{transaction.Hotel}</td>
                      <td>{transaction.Room}</td>
                      <td>{transaction.Date}</td>
                      <td>{transaction.Price}</td>
                      <td>{transaction['Payment Method']}</td>
                      <td>
                        <Label title={transaction.Status} />
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </>
      ) : (
        <NoData title="No transactions here" />
      )}
    </Container>
  );
};
export default Transaction;
