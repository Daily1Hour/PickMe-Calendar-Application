import { useState } from "react";
import { Box } from "@chakra-ui/react";
import CalendarWrapper from "./calendarWrap";
import EventDialog from "./eventDialog";
import EventManager from "./eventManager";

export type EventDetails = {
  companyName: string;
  interviewType: string;
  location: string;
  dateTime: string;
  position: string;
};

export type Events = {
  [date: string]: EventDetails[];
};

const CalendarForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<Events>({});
  const [newEvent, setNewEvent] = useState<EventDetails>({
    companyName: "",
    interviewType: "",
    location: "",
    dateTime: "",
    position: "",
  });

  const handleAddEvent = () => {
    if (!selectedDate) return;

    const dateKey = selectedDate.toDateString();
    setEvents((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEvent],
    }));

    setNewEvent({
      companyName: "",
      interviewType: "",
      location: "",
      dateTime: "",
      position: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteEvent = (index: number) => {
    if (!selectedDate) return;

    const dateKey = selectedDate.toDateString();
    const updatedEvents = [...(events[dateKey] || [])];
    updatedEvents.splice(index, 1);

    setEvents((prev) => ({
      ...prev,
      [dateKey]: updatedEvents,
    }));
  };

  const handleUpdateEvent = (index: number, updatedEvent: EventDetails) => {
    if (!selectedDate) return;

    const dateKey = selectedDate.toDateString();
    const updatedEvents = [...(events[dateKey] || [])];
    updatedEvents[index] = updatedEvent;

    setEvents((prev) => ({
      ...prev,
      [dateKey]: updatedEvents,
    }));
  };

  return (
    <Box maxW="600px" mx="auto" mt={10} p={4} borderWidth="1px" borderRadius="lg">
      <CalendarWrapper selectedDate={selectedDate} onDateChange={setSelectedDate} events={events} />
      <EventDialog
        newEvent={newEvent}
        onChange={handleInputChange}
        onAdd={handleAddEvent}
      />
      <EventManager
        events={selectedDate ? events[selectedDate.toDateString()] || [] : []}
        onDelete={handleDeleteEvent}
        onUpdate={handleUpdateEvent}
        selectedDate={selectedDate}
      />
    </Box>
  );
};

export default CalendarForm;