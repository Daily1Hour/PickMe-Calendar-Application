import {
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
    Button,
  } from "@chakra-ui/react";
  import EventForm from "./eventForm";
  import { EventDetails } from "./calendarForm";
  
  type EventDialogProps = {
    newEvent: EventDetails;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAdd: () => void;
  };
  
  const EventDialog = ({ newEvent, onChange, onAdd }: EventDialogProps) => {
    return (
      <DialogRoot>
        <DialogTrigger asChild>
          <Button mt={4} background="green">
            일정 추가
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>일정 추가</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <EventForm newEvent={newEvent} onChange={onChange} onAdd={onAdd} />
          </DialogBody>
          <DialogFooter>
            <DialogTrigger>
              <Button variant="ghost">X</Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    );
  };
  
  export default EventDialog;