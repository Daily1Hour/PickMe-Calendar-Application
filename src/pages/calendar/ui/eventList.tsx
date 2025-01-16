import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import EventInputField from "./eventInputField";
import { EventDetails } from "./calendarForm";

type EventListProps = {
  events: EventDetails[];
  onDelete: (index: number) => void;
  onUpdate: (index: number, updatedEvent: EventDetails) => void;
};

const EventList = ({ events, onDelete, onUpdate }: EventListProps) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editEvent, setEditEvent] = useState<EventDetails | null>(null);

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditEvent(events[index]);
  }; // 수정 버튼 클릭 시 해당 이벤트의 인덱스와 정보를 상태에 저장

  const handleSaveClick = () => {
    if (editIndex !== null && editEvent) {
      onUpdate(editIndex, editEvent);
      setEditIndex(null);
      setEditEvent(null);
    }
  };// 저장 버튼 클릭 시 수정된 정보를 상태에 저장하고 인덱스 초기화

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editEvent) {
      setEditEvent({ ...editEvent, [name]: value });
    }
  };// input 값이 변경될 때마다 상태에 저장

  if (events.length === 0) {
    return <Text>일정이 없습니다.</Text>;
  }

  return (
    <Box mt={4}>
      {events.map((event, index) => (
        <Box key={index} mt={4} p={2} borderWidth="1px" borderRadius="md">
          {editIndex === index ? (
            <Flex direction="column" gap={2}>
              <EventInputField
                placeholder="회사명"
                name="companyName"
                value={editEvent?.companyName || ""}
                onChange={handleInputChange}
              />
              <EventInputField
                placeholder="면접 유형"
                name="interviewType"
                value={editEvent?.interviewType || ""}
                onChange={handleInputChange}
              />
              <EventInputField
                placeholder="면접 장소"
                name="location"
                value={editEvent?.location || ""}
                onChange={handleInputChange}
              />
              <EventInputField
                placeholder="면접 날짜/시간"
                name="dateTime"
                value={editEvent?.dateTime || ""}
                onChange={handleInputChange}
              />
              <EventInputField
                placeholder="지원 직무"
                name="position"
                value={editEvent?.position || ""}
                onChange={handleInputChange}
              />
              <EventInputField 
                placeholder="메모"
                name = "description"
                value={editEvent?.description || ""}
                onChange={handleInputChange}
              />
              <Flex gap={2} mt={2}>
                <Button background="green" onClick={handleSaveClick}>
                  저장
                </Button>
                <Button onClick={() => setEditIndex(null)}>취소</Button>
              </Flex>
            </Flex>
          ) : (
            <>
              <Text fontWeight="bold">회사명: {event.companyName}</Text>
              <Text>면접 유형: {event.interviewType}</Text>
              <Text>면접 장소: {event.location}</Text>
              <Text>면접 날짜/시간: {event.dateTime}</Text>
              <Text>지원 직무: {event.position}</Text>
              <Flex gap={2} mt={2}>
                <Button background="green" onClick={() => handleEditClick(index)}>
                  수정
                </Button>
                <Button colorScheme="red" onClick={() => onDelete(index)}>
                  삭제
                </Button>
              </Flex>
            </>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default EventList;