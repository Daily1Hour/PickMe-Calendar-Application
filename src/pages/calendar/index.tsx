import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import CalendarForm from "./ui/calendarForm";
import CalendarPannel from "./ui/calendarPannel";
import { Events, EventDetails } from "./ui/calendarPannel";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<Events>({});
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date()); // 추가된 월 상태

  const handleAddEvent = (newEvent: EventDetails) => {
    if (!selectedDate) return;

    const dateKey = selectedDate.toDateString();
    setEvents((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEvent],
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
    <Flex>
      <CalendarPannel
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        currentMonth={currentMonth} // 월 상태 전달
        onMonthChange={setCurrentMonth} // 월 변경 핸들러 전달
        events={events}
        onAddEvent={handleAddEvent}
        onDeleteEvent={handleDeleteEvent}
        onUpdateEvent={handleUpdateEvent}
      />
      <CalendarForm
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        currentMonth={currentMonth} // 월 상태 전달
        onMonthChange={setCurrentMonth} // 월 변경 핸들러 전달
        events={events}
        onAddEvent={handleAddEvent}
        onDeleteEvent={handleDeleteEvent}
        onUpdateEvent={handleUpdateEvent}
      />
    </Flex>
  );
};

export default CalendarPage;
