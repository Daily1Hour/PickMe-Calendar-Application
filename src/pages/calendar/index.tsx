import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CalendarPanel from "./ui/calendarPanel";
import CalendarForm from "./ui/calendarForm";
import { Interview } from "../../entities/events/model/Interview";
import {
  createInterview,
  deleteInterview,
  getCalendar,
  getInterview,
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

  const handleDateClick = async (date: Date | null) => {
    if (!date) return;

    const dateKey = date.toLocaleDateString("sv-SE");

    if (!events.interviewDetailId) {
      setSelectedDate(date);
      return;
    }

    try {
      const interview = await getInterview(dateKey);

      setEvents((prev) => ({
        ...prev,
        [dateKey]: interview ? [interview] : [],
      }));

      setSelectedDate(date);
    } catch (error) {
      console.error("해당 날짜의 인터뷰 데이터를 불러오지 못했습니다:", error);
    }
  };

  const handleAddEvent = async (newEvent: Interview) => {
    if (!selectedDate) return;

    const dateKey = selectedDate.toLocaleDateString("sv-SE");
    newEvent.interviewTime = `${dateKey}T${newEvent.interviewTime}`;

    try {
      await createInterview(newEvent);
      setEvents((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newEvent],
      }));
    } catch (error) {
      console.error("실패!:", error);
    }
  };

  const handleDeleteEvent = async (index: number) => {
    if (!selectedDate) return;

    const dateKey = selectedDate.toLocaleDateString("sv-SE");
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

    const dateKey = selectedDate.toLocaleDateString("sv-SE");

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
      <CalendarPanel
        selectedDate={selectedDate}
        onDateChange={handleDateClick}
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
        events={events}
      />
      <CalendarForm
        selectedDate={selectedDate}
        onDateChange={handleDateClick}
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
