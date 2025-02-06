import { Box, Button } from "@chakra-ui/react";
import EventInputField from "./eventInputField";
import { createInterview } from "../api/calendarApi";
import { Interview } from "../../../entities/events/model/Interview";
import { Company } from "../../../entities/events/model/Company";

export type EventFormProps = {
  newEvent: Interview;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
};

const EventForm = ({ newEvent, onChange, onAdd }: EventFormProps) => {
  const handleSubmit = async () => {
    try {
      await createInterview();
      onAdd();
    } catch (error) {
      console.error("면접 정보 저장 실패:", error);
    }
  };
  console.log(newEvent);

  return (
    <Box>
      <EventInputField
        placeholder="회사명"
        name="name"
        value={newEvent.company.name}
        onChange={onChange}
      />
      <EventInputField
        placeholder="면접 장소"
        name="location"
        value={newEvent.company.location}
        onChange={onChange}
      />
      <EventInputField
        placeholder="면접 유형"
        name="category"
        value={newEvent.category}
        onChange={onChange}
      />
      <EventInputField
        placeholder="면접 시간"
        name="interviewTime"
        value={newEvent.interviewTime}
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
      <Button colorScheme="teal" onClick={handleSubmit}>
        저장
      </Button>
    </Box>
  );
};

export default EventForm;
