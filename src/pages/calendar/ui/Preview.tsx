import { Box, Text, HStack } from "@chakra-ui/react";
import { GrStatusGoodSmall } from "react-icons/gr";
import { Company } from "../../../entities/events/model/Company";

type PreviewProps = {
  events: Company[];
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
              회사: {event.name} | 장소: {event.location}
            </Text>
          </HStack>
        </Box>
      ))}
    </Box>
  );
};

export default Preview;
