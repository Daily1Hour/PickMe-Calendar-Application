import Calendar from 'react-calendar';
import { useState, useEffect } from 'react';
import { Box, Button } from "@chakra-ui/react"

type DatePiece = Date | null;

type SelectDate = DatePiece | [DatePiece, DatePiece];

const calendarForm = () => {
    const [value, onChange] = useState<SelectDate>(new Date());
	return (
        <Box>
      	<Calendar onChange={onChange} value={value}>
        </ Calendar>
        </Box>
    )
};

export default calendarForm;