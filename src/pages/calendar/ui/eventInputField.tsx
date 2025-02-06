import { Input } from "@chakra-ui/react";

type EventInputFieldProps = {
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const EventInputField = ({
  placeholder,
  name,
  value,
  onChange,
}: EventInputFieldProps) => {
  return placeholder === "면접 시간" ? (
    <Input
      placeholder={placeholder}
      name={name}
      type="time"
      value={value}
      onChange={onChange}
      mb={2}
    />
  ) : (
    <Input
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      mb={2}
    />
  );
};

export default EventInputField;
