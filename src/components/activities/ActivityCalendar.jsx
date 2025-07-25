import React from "react";
import Calendar from "react-calendar"; 
import 'react-calendar/dist/Calendar.css';

const ActivityCalendar = ({ selectedDate, onChange, activities }) => {
  const tileClassName = ({ date }) => {
    const dateStr = date.toISOString().split('T')[0];
    if (activities.includes(dateStr)) {
      return 'has-activity';
    }
    return null;
  };

  return (
    <Calendar
      value={selectedDate}
      onChange={onChange}
      tileClassName={tileClassName}
      minDate={new Date()}
    />
  );
};

export default ActivityCalendar;