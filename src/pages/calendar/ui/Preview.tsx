import { Box, Text, HStack } from "@chakra-ui/react";
import { GrStatusGoodSmall } from "react-icons/gr";
import { Interview } from "../../../entities/events/model/Interview";

type PreviewProps = {
  events: Interview[]; // Change this line
  selectedDate: Date | null;
};

const Preview = ({ events, selectedDate }: PreviewProps) => {
  console.log("Preview events:", events);
  return (
    <Box mt={6} w="20vw">
      <Text fontSize="lg">
        {selectedDate ? selectedDate.toDateString() : "날짜를 선택해주세요."}의
        일정:
      </Text>
      {events.map((event, index) => (
        <Box
          key={index}
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          my={2}
          maxW="20vw"
        >
          <HStack>
            <GrStatusGoodSmall color="teal" />
            <Text>
              회사: {event.company.name} | 장소: {event.company.location}
            </Text>
          </HStack>
        </Box>
      ))}
    </Box>
  );
};

export default Preview;
