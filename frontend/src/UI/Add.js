import classes from './Add.module.css';

const Add = ({ handleClick }) => {
  return (
    <div className={classes['container']} onClick={handleClick}>
      <i className={`fa-solid fa-plus ${classes['add']}`}></i>
    </div>
  );
};
export default Add;
