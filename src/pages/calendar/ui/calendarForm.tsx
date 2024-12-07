import Calendar from "react-calendar";
import { useState } from "react";
import { Box, Button, Text, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@chakra-ui/react";
import EventForm from "./eventForm";
import EventList from "./eventList";
import 'react-calendar/dist/Calendar.css'; // 기본 스타일 가져오기

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
    updatedEvents.splice(index, 1); // 이벤트 삭제

    setEvents((prev) => ({
      ...prev,
      [dateKey]: updatedEvents,
    }));
  };

  return (
    <Box maxW="600px" mx="auto" mt={10} p={4} borderWidth="1px" borderRadius="lg">
      <Calendar
        onChange={(value) => {
          if (value instanceof Date) {
            setSelectedDate(value);
          } else if (Array.isArray(value)) {
            setSelectedDate(value[0]);
          } else {
            setSelectedDate(null);
          }
        }}
        value={selectedDate}
        className="react-calendar-custom" // 커스텀 클래스명 추가
        tileClassName="react-calendar-tile" // 날짜 타일 커스터마이즈
        minDetail="month" // 최소한 월 단위로만 보기
      />
      <DialogRoot>
        <DialogTrigger asChild>
          <Button mt={4} colorScheme="blue">
            일정 추가
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>일정 추가</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <EventForm
              newEvent={newEvent}
              onChange={handleInputChange}
              onAdd={handleAddEvent}
            />
          </DialogBody>
          <DialogFooter>
            <DialogTrigger>
              <Button variant="ghost">X</Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      <Box mt={6}>
        <Text fontSize="lg">
          {selectedDate ? selectedDate.toDateString() : "No Date Selected"}의 일정:
        </Text>
        <EventList
          events={selectedDate ? events[selectedDate.toDateString()] || [] : []}
          onDelete={handleDeleteEvent} // 삭제 핸들러 전달
        />
      </Box>
    </Box>
  );
};

export default CalendarForm;