import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRange } from 'react-date-range';
import { useState } from 'react';
// Render component chọn khoảng thời gian
const DateRangeComponent = (props) => {
  // Nều người dùng đã chọn date range trươc đó sẽ cập nhật startDate và endDate trong lần render component kế tiếp, không sẽ set startDate và endDate là ngày hôm nay
  const [startDate, endDate] = props.curRange;
  const rangeObject = {
    startDate: startDate ? new Date(startDate) : new Date(),
    endDate: endDate ? new Date(endDate) : new Date(),
  };
  const [range, setRange] = useState([
    {
      key: 'selection',
      ...rangeObject,
    },
  ]);

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  // Render DateRangeComponent từ DateRange cùng với các options, trong đó onChange nhận hàm getChangeValue để cập nhật và hiển thị startDate và endDate ra UI
  return (
    <DateRange
      editableDateInputs={true}
      className={`date ${props.className}`}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      ranges={range}
      direction="horizontal"
      onChange={(item) => {
        setRange([item.selection]);
        const s = item.selection.startDate.toLocaleString('en', options);
        const e = item.selection.endDate.toLocaleString('en', options);
        props.getChangeValue(s, e);
      }}
    />
  );
};

export default DateRangeComponent;
