import { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchContext from '../../context/SearchContext';

import DateRangeComponent from '../../utils/DateRange';
import Button from '../../UI/Button';
import { Input } from '../../UI/InputField';
import classes from './Search.module.css';

const SearchField = () => {
  // useContext để lấy search state và hàm setState của Root, sau đó dùng useState để thay xử lý context
  // useRef để lấy dom node của DateRangeComponent
  // 1 useState khác để xử lý đóng mở DateRangeComponent
  const [search, setSubmitValue] = useContext(SearchContext);
  const [searchValue, setSearchValue] = useState(search);
  const [isActive, setIsActive] = useState(false);
  const modal = useRef(null);
  // Lấy startDate và endDate từ state searchValue
  const { startDate, endDate } = searchValue;
  const range = [startDate, endDate];
  const searchGroup = ['Adult', 'Children', 'Rooms'];
  // Hàm update state dateRange, pass hàm này cho DateRangeComponent
  const getDateChangeValue = (startDate, endDate) => {
    setSearchValue({
      ...searchValue,
      startDate,
      endDate,
    });
  };
  // Xử lý mở DateRangeComponent khi người dùng click
  const handleOpen = () => {
    setIsActive(true);
  };
  // Xử lý đóng DateRangeComponent khi người dùng di chuột khỏi phạm vi
  const handleClose = (e) => {
    setIsActive(false);
  };
  // Update State khi người dùng input vào SearchField
  const handleChange = function (e) {
    const key = this;
    setSearchValue({
      ...searchValue,
      [key]: e.target.value,
    });
  };
  // Update state của root page bằng searchValue khi người dùng click vào button
  const handleSubmit = (e) => {
    setSubmitValue(searchValue);
  };

  return (
    <div className={`bg-white p-2 ${classes['search-field']}`}>
      <div className="input-group input-group-lg">
        <span className="input-group-text col">
          <i className="fa fa-bed"></i>
          <select className='border border-0 ms-2' defaultValue='' onChange={handleChange.bind('city')}>
            <option value='' disabled>Where are you going?</option>
            <option value='Ha Noi'>Hà Nội</option>
            <option value='Da Nang'>Đà Nẵng</option>
            <option value='Ho Chi Minh'>Hồ Chí Minh</option>
          </select>
        </span>

        <span
          className="input-group-text position-relative col"
          onClick={handleOpen}
        >
          <i className="fa fa-calendar col-2"></i>
          <p className="m-0">
            {startDate || endDate
              ? `${startDate} - ${endDate}`
              : 'Pick date range'}
          </p>
          {/* Nếu isActive state là true mới render DateRangeComponent */}
          {isActive && (
            <div
              className={`${classes['date']}`}
              ref={modal}
              onMouseLeave={handleClose}
            >
              <DateRangeComponent
                getChangeValue={getDateChangeValue}
                curRange={range}
              />
            </div>
          )}
        </span>

        <span className="input-group-text col">
          <i className="fa fa-female"></i>
          <span className="input-group-text form-control p-0">
            {searchGroup.map((search) => (
              <input
                key={search}
                type='number'
                className="form-control col input-group-text"
                placeholder={search}
                onChange={handleChange.bind(`num${search}`)}
                min={0}
              />
            ))}
          </span>
        </span>
        <Link to="search">
          <Button
            title="Search"
            className="h-100 bg-primary text-white"
            id="button-addon2"
            onClick={handleSubmit}
          />
        </Link>
      </div>
    </div>
  );
};

export default SearchField;
