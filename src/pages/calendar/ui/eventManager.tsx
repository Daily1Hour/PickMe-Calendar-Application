import { Box, Text } from "@chakra-ui/react";
import EventList from "./eventList";
import { GetInterviewDetailDTO } from "../api/calendarDTOList";
import { Interview } from "../../../entities/events/model/Interview";

type EventManagerProps = {
  events: Interview[];
  onDelete: (index: number) => void;
  onUpdate: (index: number, updatedEvent: GetInterviewDetailDTO) => void;
  selectedDate: Date | null;
};

const EventManager = ({
  events,
  onDelete,
  onUpdate,
  selectedDate,
}: EventManagerProps) => {
  return (
    <Box mt={6} width="700px">
      <Text fontSize="lg">
        {selectedDate ? selectedDate.toDateString() : "날짜를 선택해주세요!"}의
        일정:
      </Text>
      <EventList events={events} onDelete={onDelete} onUpdate={onUpdate} />
    </Box>
  );
};

export default EventManager;
