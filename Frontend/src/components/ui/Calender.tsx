import React, { JSX, useState } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isToday from "dayjs/plugin/isToday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(weekday);
dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type CalendarProps = {
  value: dayjs.Dayjs | null;
  onSelectDate: (date: dayjs.Dayjs) => void; // Function to handle date selection
};

const Calendar: React.FC<CalendarProps> = ({ value, onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDay = startOfMonth.weekday();
  const daysInMonth = currentDate.daysInMonth();

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const generateCalendar = () => {
    const days: JSX.Element[] = [];

    // Empty space before the first date of the month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    // Days of the month
    for (let d = 1; d <= daysInMonth; d++) {
      const date = currentDate.date(d);
      const isSelected = value?.isSame(date, "day");
      const isCurrentDay = date.isToday();

      days.push(
        <div
          key={d}
          className={`text-center p-2 rounded-lg cursor-pointer ${
            isCurrentDay ? "bg-blue-200" : ""
          } ${isSelected ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
          onClick={() => onSelectDate(date)} // On date click, select the date
        >
          {d}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-lg font-bold">&lt;</button>
        <h2 className="text-xl font-semibold">{currentDate.format("MMMM YYYY")}</h2>
        <button onClick={nextMonth} className="text-lg font-bold">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center font-medium text-gray-700">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 mt-2">
        {generateCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
