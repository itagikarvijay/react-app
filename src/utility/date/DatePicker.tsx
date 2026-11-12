import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Explicitly type the state as Date | null
const MyDatePicker: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div>
      <h2>Select a date:</h2>
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        dateFormat="dd/MM/yyyy"
        isClearable
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
      />
      {startDate && <p>Chosen date: {startDate.toLocaleString()}</p>}
    </div>
  );
};

export default MyDatePicker;
