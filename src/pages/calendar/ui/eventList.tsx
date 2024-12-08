import { Box, Text, Button, Input, Flex } from "@chakra-ui/react";
import { useState } from "react";

type EventDetails = {
  companyName: string;
  interviewType: string;
  location: string;
  dateTime: string;
  position: string;
};

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
    setEditEvent(events[index]); // 선택된 이벤트를 수정 상태로
  };

  const handleSaveClick = () => {
    if (editIndex !== null && editEvent) {
      onUpdate(editIndex, editEvent);
      setEditIndex(null); // 수정 상태 초기화
      setEditEvent(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editEvent) {
      setEditEvent({ ...editEvent, [name]: value });
    }
  };

  if (events.length === 0) {
    return <Text>No events for this date.</Text>;
  }

  return (
    <Box mt={4}>
      {events.map((event, index) => (
        <Box key={index} mt={4} p={2} borderWidth="1px" borderRadius="md">
          {editIndex === index ? (
            <Flex direction="column" gap={2}>
              <Input
                placeholder="회사명"
                name="companyName"
                value={editEvent?.companyName || ""}
                onChange={handleInputChange}
              />
              <Input
                placeholder="면접 유형"
                name="interviewType"
                value={editEvent?.interviewType || ""}
                onChange={handleInputChange}
              />
              <Input
                placeholder="면접 장소"
                name="location"
                value={editEvent?.location || ""}
                onChange={handleInputChange}
              />
              <Input
                placeholder="면접 날짜/시간"
                name="dateTime"
                value={editEvent?.dateTime || ""}
                onChange={handleInputChange}
              />
              <Input
                placeholder="지원 직무"
                name="position"
                value={editEvent?.position || ""}
                onChange={handleInputChange}
              />
              <Flex gap={2} mt={2}>
                <Button background="green" onClick={handleSaveClick}>저장</Button>
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
                <Button colorScheme="black" onClick={() => onDelete(index)}>
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