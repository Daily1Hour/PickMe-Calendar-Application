import { Input, Button, Box } from "@chakra-ui/react";

type EventDetails = {
  companyName: string;
  interviewType: string;
  location: string;
  dateTime: string;
  position: string;
};

type EventFormProps = {
  newEvent: EventDetails;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
};

const EventForm = ({ newEvent, onChange, onAdd }: EventFormProps) => {
  return (
    <Box>
      <Input
        placeholder="회사명"
        name="companyName"
        value={newEvent.companyName}
        onChange={onChange}
        mb={2}
      />
      <Input
        placeholder="면접 유형"
        name="interviewType"
        value={newEvent.interviewType}
        onChange={onChange}
        mb={2}
      />
      <Input
        placeholder="면접 장소"
        name="location"
        value={newEvent.location}
        onChange={onChange}
        mb={2}
      />
      <Input
        placeholder="면접 날짜/시간"
        name="dateTime"
        value={newEvent.dateTime}
        onChange={onChange}
        mb={2}
      />
      <Input
        placeholder="지원 직무"
        name="position"
        value={newEvent.position}
        onChange={onChange}
        mb={2}
      />
      <Button background="green" onClick={onAdd}>
        저장
      </Button>
    </Box>
  );
};

export default EventForm;