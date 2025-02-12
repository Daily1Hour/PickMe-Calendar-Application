import { Interview } from "../../../entities/events/model/Interview";
import { GetInterviewDTO } from "../api/calendarDTOList";

export function DtoToInterview(dto: GetInterviewDTO) {
    return new Interview(
        dto.company,
        dto.interviewTime,
        dto.position,
        dto.category,
        dto.description,
        dto.interviewDetailId,

    )
}