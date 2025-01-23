import {
  Box,
  Button,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@chakra-ui/react";
import CalendarWrapper from "./calendarWrap";
import Preview from "./Preview";
import { GrFormPrevious } from "react-icons/gr";

export type EventDetails = {
  companyName: string;
  interviewType: string;
  location: string;
  dateTime: string;
  position: string;
  description: string;
};

export type Events = {
  [date: string]: EventDetails[];
};

const CalendarPannel = ({
  selectedDate,
  onDateChange,
  currentMonth,
  onMonthChange,
  events,
}: {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  currentMonth: Date;
  onMonthChange: (month: Date) => void;
  events: Events;
  onAddEvent: (newEvent: EventDetails) => void;
  onDeleteEvent: (index: number) => void;
  onUpdateEvent: (index: number, updatedEvent: EventDetails) => void;
}) => {
  return (
    <PopoverRoot closeOnInteractOutside={false} defaultOpen unstyled>
      <PopoverTrigger asChild position={"fixed"}>
        <Button colorPalette="teal">OPEN</Button>
      </PopoverTrigger>
      <PopoverContent
        height="100vh"
        width="fit-content"
        borderWidth="1px"
        borderRadius="lg"
        position="fixed"
        bg="white"
      >
        <PopoverCloseTrigger alignSelf="end" p="10px" position={"fixed"}>
          <Button variant="ghost"><GrFormPrevious /></Button>
        </PopoverCloseTrigger>
        <Box mx="auto" my={10} p={4}>
          <CalendarWrapper
            selectedDate={selectedDate}
            onDateChange={onDateChange}
            currentMonth={currentMonth}
            onMonthChange={onMonthChange}
            events={events}
          />
          <Preview
            events={
              selectedDate ? events[selectedDate.toDateString()] || [] : []
            }
            selectedDate={selectedDate}
          />
        </Box>
      </PopoverContent>
    </PopoverRoot>
  );
};
export default CalendarPannel;
