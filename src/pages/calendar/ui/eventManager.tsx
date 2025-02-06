import { Box, Text } from "@chakra-ui/react";
import EventList from "./eventList";
import { GetInterviewDetailDTO } from "../api/calendarDTOList";

type EventManagerProps = {
  events: GetInterviewDetailDTO[];
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
        {selectedDate ? selectedDate.toDateString() : "No Date Selected"}의
        일정:
      </Text>
      <EventList events={events} onDelete={onDelete} onUpdate={onUpdate} />
    </Box>
  );
};

export default EventManager;
