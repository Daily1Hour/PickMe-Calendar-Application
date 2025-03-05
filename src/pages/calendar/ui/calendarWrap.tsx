import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
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

    .react-calendar__tile--now {
      background: none;
      border: solid 1px rgba(0, 154, 110, 0.5) !important;
    }

    .react-calendar__tile--range {
      background: rgba(0, 154, 110, 0.5) !important;
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
  events: Record<string, Interview[]>;
};

const CalendarWrapper = ({
  selectedDate,
  onDateChange,
  currentMonth,
  onMonthChange,
  events,
}: CalendarWrapperProps) => {
  const dateHasEvent = (date: Date) => {
    const dateKey = date.toLocaleDateString("sv-SE");
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
            onMonthChange(activeStartDate);
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
        activeStartDate={currentMonth}
      />
    </Box>
  );
};

export default CalendarWrapper;
