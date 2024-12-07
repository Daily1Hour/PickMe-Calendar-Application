import Calendar from "react-calendar";
import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@chakra-ui/react";

type Events = {
  [date: string]: string[]; // 날짜별로 이벤트 배열을 저장
};

const CalendarForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<Events>({});
  const [newEvent, setNewEvent] = useState<string>("");

  // 일정 추가 함수
  const handleAddEvent = () => {
    if (!newEvent.trim() || !selectedDate) return; // 빈 입력값 및 선택된 날짜가 없는 경우 방지

    const dateKey = selectedDate.toDateString(); // 키로 사용할 날짜 문자열
    setEvents((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEvent],
    }));
    setNewEvent(""); // 입력값 초기화
  };

  return (
    <Box maxW="600px" mx="auto" mt={10} p={4} borderWidth="1px" borderRadius="lg">
      <Calendar
        onChange={(value) => {
          if (value instanceof Date) {
            setSelectedDate(value); // 단일 날짜만 처리
          } else if (Array.isArray(value)) {
            setSelectedDate(value[0]); // 범위 선택 시 시작 날짜만 처리
          } else {
            setSelectedDate(null); // 선택이 해제되었을 때
          }
        }}
        value={selectedDate}
      />

      {/* Dialog 사용 */}
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
            <Input
              placeholder="Event description"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
            />
          </DialogBody>
          <DialogFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddEvent}>
              저장
            </Button>
            <DialogCloseTrigger>
              <Button variant="ghost">취소</Button>
            </DialogCloseTrigger>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      {/* 선택된 날짜의 이벤트 표시 */}
      <Box mt={6}>
        <Text fontSize="lg">
          {selectedDate ? selectedDate.toDateString() : "No Date Selected"}의 면접:
        </Text>
        <Box mt={2}>
          {(selectedDate && events[selectedDate.toDateString()] || []).map(
            (event, index) => (
              <Text key={index} fontSize="md">
                - {event}
              </Text>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CalendarForm;