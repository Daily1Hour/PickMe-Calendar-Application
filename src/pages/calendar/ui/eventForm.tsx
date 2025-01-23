// components/EventForm.tsx
import { Box, Button } from "@chakra-ui/react";
import EventInputField from "./eventInputField";
import { EventDetails } from "./calendarForm";

type EventFormProps = {
  newEvent: EventDetails;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
};

const EventForm = ({ newEvent, onChange, onAdd }: EventFormProps) => {
  return (
    <Box>
      <EventInputField
        placeholder="회사명"
        name="companyName"
        value={newEvent.companyName}
        onChange={onChange}
      />
      <EventInputField
        placeholder="면접 유형"
        name="interviewType"
        value={newEvent.interviewType}
        onChange={onChange}
      />
      <EventInputField
        placeholder="면접 장소"
        name="location"
        value={newEvent.location}
        onChange={onChange}
      />
      <EventInputField
        placeholder="면접 날짜/시간"
        name="dateTime"
        value={newEvent.dateTime}
        onChange={onChange}
      />
      <EventInputField
        placeholder="지원 직무"
        name="position"
        value={newEvent.position}
        onChange={onChange}
      />
      <EventInputField
        placeholder="메모"
        name="description"
        value={newEvent.description}
        onChange={onChange}
      />
      <Button colorPalette="teal" onClick={onAdd}>
        저장
      </Button>
    </Box>
  );
};

export default EventForm;
