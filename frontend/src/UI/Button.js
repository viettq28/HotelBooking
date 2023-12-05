const Button = ({ title, className, id, onClick, type }) => {
  return (
    <button
      type={type ? type : 'button'}
      className={`${className} btn`}
      id={id}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
export default Button;
