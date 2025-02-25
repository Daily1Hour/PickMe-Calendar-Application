import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CalendarPannel from "./ui/calendarPannel";
import CalendarForm from "./ui/calendarForm";
import { Interview } from "../../entities/events/model/Interview";
import {
  deleteInterview,
  getCalendar,
  updateInterview,
} from "./api/calendarApi";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<Record<string, Interview[]>>({});
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getCalendar();
        setEvents(fetchedEvents);
        console.log("events:", fetchedEvents);
      } catch (error) {
        console.error("불러오기 실패:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleAddEvent = async (newEvent: Interview) => {
    if (!selectedDate) return;

    const dateKey = selectedDate.toISOString().split("T")[0];
    setEvents((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEvent],
    }));
  };

  const handleDeleteEvent = async (index: number) => {
    if (!selectedDate) return;

    const dateKey = selectedDate.toISOString().split("T")[0];
    const eventsForDate = events[dateKey] || [];

    const eventToDelete = eventsForDate[index];
    if (!eventToDelete) return;

    try {
      await deleteInterview(eventToDelete.interviewDetailId);
      console.log(`Deleted event with ID: ${eventToDelete.interviewDetailId}`);

      setEvents((prev) => {
        const updatedEvents = [...(prev[dateKey] || [])];
        updatedEvents.splice(index, 1);
        return { ...prev, [dateKey]: updatedEvents };
      });
    } catch (error) {
      console.error("Failed to delete interview event:", error);
    }
  };

  const handleUpdateEvent = async (index: number, updatedEvent: Interview) => {
    if (!selectedDate) return;

    const dateKey = selectedDate.toISOString().split("T")[0];

    try {
      await updateInterview(updatedEvent.interviewDetailId, updatedEvent);

      setEvents((prev) => {
        const updatedEvents = [...(prev[dateKey] || [])];
        updatedEvents[index] = updatedEvent;
        return { ...prev, [dateKey]: updatedEvents };
      });

      console.log("Interview event successfully updated!");
    } catch (error) {
      console.error("Failed to update interview event:", error);
    }
  };

  return (
    <Flex>
      <CalendarPannel
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
        events={events}
      />
      <CalendarForm
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
        events={events}
        onAddEvent={handleAddEvent}
        onDeleteEvent={handleDeleteEvent}
        onUpdateEvent={handleUpdateEvent}
      />
    </Flex>
  );
};

export default CalendarPage;
