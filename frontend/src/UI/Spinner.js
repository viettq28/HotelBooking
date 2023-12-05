import classes from './Spinner.module.css'

const Spinner = () => {
  return (
    <>
      <div className={classes['container']}>
        <i className={`fa-solid fa-spinner ${classes['spinner']}`}></i>
      </div>
    </>
  );
};
export default Spinner;
