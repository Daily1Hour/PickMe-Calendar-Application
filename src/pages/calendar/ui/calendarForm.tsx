import { useState } from "react";
import { Box } from "@chakra-ui/react";
import EventDialog from "./eventDialog";
import EventManager from "./eventManager";
import DetailCalendar from "./DetailCalendar";

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

const CalendarForm = ({
  selectedDate,
  onDateChange,
  currentMonth,
  onMonthChange,
  events,
  onAddEvent,
  onDeleteEvent,
  onUpdateEvent,
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
  const [newEvent, setNewEvent] = useState<EventDetails>({
    companyName: "",
    interviewType: "",
    location: "",
    dateTime: "",
    position: "",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddEvent = () => {
    onAddEvent(newEvent);
    setNewEvent({
      companyName: "",
      interviewType: "",
      location: "",
      dateTime: "",
      position: "",
      description: "",
    });
  };

  return (
    <Box mx="auto" mt={10} p={4} placeItems="center">
      <DetailCalendar
        selectedDate={selectedDate}
        onDateChange={onDateChange}
        currentMonth={currentMonth}
        onMonthChange={onMonthChange}
        events={events}
      />
      <EventDialog
        newEvent={newEvent}
        onChange={handleInputChange}
        onAdd={handleAddEvent}
      />
      <EventManager
        events={selectedDate ? events[selectedDate.toDateString()] || [] : []}
        onDelete={onDeleteEvent}
        onUpdate={onUpdateEvent}
        selectedDate={selectedDate}
      />
    </Box>
  );
};
export default CalendarForm;
