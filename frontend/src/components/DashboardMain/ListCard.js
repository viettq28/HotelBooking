import { useState, useEffect } from 'react';
import useHttp from '../../hooks/useHttp';
import classes from './ListCard.module.css';

const token = localStorage.getItem('TOKEN');
const urls = {
  users: 'http://localhost:5000/user/stats',
  transactionStats: `http://localhost:5000/${token}/transaction/stats`,
  monthlyBalance: `http://localhost:5000/${token}/transaction/monthly-balance`,
};

const Card = ({ title, value, children }) => {
  return (
    <div className={`w-100 border rounded p-2 ${classes['container']}`}>
      <div className={classes['card-title']}>{title}</div>
      <div className={classes['card-value']}>{value}</div>
      {children}
    </div>
  );
};

const ListCard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [users, transactionStats, monthlyBalance] = await Promise.all(
          Object.values(urls).map(async (url) => {
            const data = await fetch(url);
            return data.json();
          })
        );
        const totalUsers = users.data.totalUsers;
        const { totalTransactions, earn } = transactionStats.data;
        const balance =
          monthlyBalance.data.reduce((acc, month) => (acc += month.earn), 0) /
          monthlyBalance.data.length;
        setData({ totalUsers, totalTransactions, earn, balance });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const list = [
    { title: 'users', icon: 'fa-regular fa-user', value: data?.totalUsers || 0 },
    { title: 'orders', icon: 'fa-solid fa-cart-shopping', value: data?.totalTransactions || 0},
    { title: 'earnings', icon: 'fa-solid fa-circle-dollar-to-slot', value: `$ ${data?.earn || 0}`},
    { title: 'balance', icon: 'fa-solid fa-wallet', value: `$ ${data?.balance || 0}`},
  ];
  return (
    <div className="d-flex gap-3">
      {list.map((property, i) => {
        return (
          <Card
            key={property.title}
            title={property.title.toUpperCase()}
            value={property.value}
          >
            <div className={`${classes[`icon${i}`]}`}>
              <i className={property.icon}></i>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
export default ListCard;
