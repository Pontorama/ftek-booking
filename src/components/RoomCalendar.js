import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/calendar.css';

const RoomCalendar = ({ reservations, setSelectedDate, setActiveDate }) => {
  const reservationDates = reservations.map(reservation => new Date(reservation.date).getDate());

  const handleActiveStartDateChange = ({ activeStartDate, value, view }) => {
    if (view === 'month')
      setActiveDate(activeStartDate);
  };

  const getTileClass = ({ activeStartDate, date, view }) => {
    if (view === 'month' && reservationDates.some(reservationDate => reservationDate === date.getDate()))
      return 'has-reservation';
    else
      return null;
  };

  return (
    <Calendar 
      onClickDay={(date) => setSelectedDate(date)}
      onActiveStartDateChange={handleActiveStartDateChange}
      tileClassName={getTileClass}
    />
  );
};

export default RoomCalendar;