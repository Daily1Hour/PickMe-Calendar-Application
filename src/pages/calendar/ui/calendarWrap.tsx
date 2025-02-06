import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 스타일 가져오기
import { Box } from "@chakra-ui/react";
import styled from "styled-components";
import { Interview } from "../../../entities/events/model/Interview";

export const StyledCalendar = styled(Calendar)`
  &.react-calendar-custom {
    border: 1px solid #ccc;
    padding: 10px;

    .react-calendar__tile {
      text-align: center;
      transition: background-color 0.3s ease;
      height: 45px;

      &:hover {
        background-color: #009a6e;
      }
    }

    .react-calendar__tile--now {
      background: grey !important;
    }

    .highlight-tile {
      background-color: #90ee90 !important;
      border-radius: 50%;
      color: white;
      font-weight: bold;
    }
  }
`;

type CalendarWrapperProps = {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  currentMonth: Date;
  onMonthChange: (month: Date) => void;
  events: Interview; // 일정 데이터 추가
};

const CalendarWrapper = ({
  selectedDate,
  onDateChange,
  currentMonth,
  onMonthChange,
  events,
}: CalendarWrapperProps) => {
  // 특정 날짜에 일정이 있는지 확인하는 함수
  const dateHasEvent = (date: Date) => {
    const dateKey = date.toDateString();
    return events[dateKey]?.length > 0;
  };

  return (
    <Box placeItems="center">
      <StyledCalendar
        onChange={(value) => {
          if (value instanceof Date) {
            onDateChange(value);
          } else if (Array.isArray(value)) {
            onDateChange(value[0]);
          } else {
            onDateChange(null);
          }
        }}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) {
            onMonthChange(activeStartDate); // 월 변경 핸들러 호출
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
        activeStartDate={currentMonth} // 현재 월 상태와 동기화
      />
    </Box>
  );
};

export default CalendarWrapper;
