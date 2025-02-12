import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CalendarPannel from "./ui/calendarPannel";
import CalendarForm from "./ui/calendarForm";
import { Interview } from "../../entities/events/model/Interview";
import { getCalendar } from "./api/calendarApi";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<Record<string, Interview[]>>({});
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getCalendar();
        const mappedEvents: Record<string, Interview[]> = {};

        response.interviewDetails.forEach((interview: Interview) => {
          const dateKey = interview.interviewTime?.split("T")[0];
          if (dateKey) {
            if (!mappedEvents[dateKey]) {
              mappedEvents[dateKey] = [];
            }
            mappedEvents[dateKey].push({
              interviewTime: interview.interviewTime,
              category: interview.category,
              position: interview.position,
              description: interview.description,
              company: {
                name: interview.company.name,
                location: interview.company.location,
              },
              interviewDetailId: "",
            });
          }
        });

        setEvents(mappedEvents);
        console.log("API에서 불러온 events:", mappedEvents);
      } catch (error) {
        console.error("Failed to fetch interview events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleAddEvent = (newEvent: Interview) => {
    if (!selectedDate) return;

    const dateKey = selectedDate.toISOString().split("T")[0];
    setEvents((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEvent],
    }));
  };

  const handleDeleteEvent = (index: number) => {
    if (!selectedDate) return;

    const dateKey = selectedDate.toISOString().split("T")[0];
    const updatedEvents = [...(events[dateKey] || [])];
    updatedEvents.splice(index, 1);

    setEvents((prev) => ({
      ...prev,
      [dateKey]: updatedEvents,
    }));
  };

  const handleUpdateEvent = (index: number, updatedEvent: Interview) => {
    if (!selectedDate) return;

    const dateKey = selectedDate.toISOString().split("T")[0];
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
