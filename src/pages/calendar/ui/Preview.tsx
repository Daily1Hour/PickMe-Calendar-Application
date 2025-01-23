import { Box, Text, HStack } from "@chakra-ui/react";
import { EventDetails } from "./calendarPannel";
import { GrStatusGoodSmall } from "react-icons/gr";

type PreviewProps = {
  events: EventDetails[];
  selectedDate: Date | null;
};

const Preview = ({ events, selectedDate }: PreviewProps) => {
  return (
    <Box mt={6}>
      <Text fontSize="lg">
        {selectedDate ? selectedDate.toDateString() : "날짜를 선택해주세요."}의
        일정:
      </Text>
      {events.map((event, index) => (
        <Box key={index} p={4} borderWidth="1px" borderRadius="lg" my={2}>
          <HStack>
            <GrStatusGoodSmall color="teal" />
            <Text>
              회사: {event.companyName} | 장소: {event.location} 시간:{" "}
              {event.dateTime}
            </Text>
          </HStack>
        </Box>
      ))}
    </Box>
  );
};

export default Preview;
