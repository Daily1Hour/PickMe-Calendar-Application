import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 스타일 가져오기
import { Box } from "@chakra-ui/react";



type EventDetails = {
  companyName: string;
  interviewType: string;
  location: string;
  dateTime: string;
  position: string;
};

type Events = {
  [date: string]: EventDetails[];
};

type CalendarWrapperProps = {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  events: Events; // 일정 데이터 추가
};

const CalendarWrapper = ({ selectedDate, onDateChange, events }: CalendarWrapperProps) => {
  // 특정 날짜에 일정이 있는지 확인하는 함수
  const dateHasEvent = (date: Date) => {
    const dateKey = date.toDateString();
    return events[dateKey]?.length > 0;
  };

  return (
    <Box placeItems="center">
      <Calendar
        onChange={(value) => {
          if (value instanceof Date) {
            onDateChange(value);
          } else if (Array.isArray(value)) {
            onDateChange(value[0]);
          } else {
            onDateChange(null);
          }
        }}
        value={selectedDate}
        className="react-calendar-custom"
        tileClassName={({ date, view }) =>
          view === "month" && dateHasEvent(date) ? "highlight-tile" : ""
        }
        calendarType="gregory"
        minDetail="month"
        prev2Label={null}
        next2Label={null}
        showNeighboringMonth={false}
      />
    </Box>
  );
};

export default CalendarWrapper;