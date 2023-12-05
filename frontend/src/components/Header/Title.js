import Button from "../../UI/Button";

// Component render Title cho Header
const Title = () => {
  return (
    <div className="text-white pb-5">
      <h1 className="mt-0">A lifetime of discounts? It's Genius</h1>
      <p>
        Get rewarded for your travels - unlock instant saving of 10% or more
        with free acount
      </p>
      <Button title='Sign in/Register' className='btn-primary me-2' />
    </div>
  );
};
export default Title;
