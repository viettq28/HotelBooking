import data from '../../data/footer.json';
import classes from './Footer.module.css';

// Component Footer render các col_values được sắp xếp theo col_number lấy từ data
const Footer = () => {
  return (
    <div className={`${classes['footer-container']} container`}>
      <div className="row">
        {data.map((col) => {
          return (
            <div key={col.col_number} className="col">
              {col.col_values.map((value) => (
                <p key={value}>{value}</p>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Footer;
