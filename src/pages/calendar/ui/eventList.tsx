import { Box, Text, Button } from "@chakra-ui/react";

type EventDetails = {
  companyName: string;
  interviewType: string;
  location: string;
  dateTime: string;
  position: string;
};

type EventListProps = {
  events: EventDetails[];
  onDelete: (index: number) => void; // 삭제 핸들러
};

const EventList = ({ events, onDelete }: EventListProps) => {
  if (events.length === 0) {
    return <Text>일정이 없습니다.</Text>;
  }

  return (
    <Box mt={4}>
      {events.map((event, index) => (
        <Box key={index} mt={4} p={2} borderWidth="1px" borderRadius="md">
          <Text fontWeight="bold">회사명: {event.companyName}</Text>
          <Text>면접 유형: {event.interviewType}</Text>
          <Text>면접 장소: {event.location}</Text>
          <Text>면접 날짜/시간: {event.dateTime}</Text>
          <Text>지원 직무: {event.position}</Text>
          <Button colorScheme="red" mt={2} onClick={() => onDelete(index)}>
            X
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default EventList;