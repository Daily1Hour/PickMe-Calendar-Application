import { Interview } from "../../../entities/events/model/Interview";
import { PostInterviewDetailDTO } from "../api/calendarDTOList";

export function interviewToCreateDto(interview: Interview) {
    let formattedInterviewTime = null;

    if (interview.interviewTime) {
        try {
            const today = new Date();
            const [hours, minutes] = interview.interviewTime.split(":").map(Number);
            today.setHours(hours, minutes, 0, 0);

            formattedInterviewTime = today.toISOString();
        } catch (error) {
            console.error("면접 시간 변환 오류:", error);
        }
    }
    return {
        company: {
            name: interview.company.name,
            location: interview.company.location,
        },
        interviewTime: formattedInterviewTime,
        category: interview.category,
        position: interview.position,
        description: interview.description,
    } as PostInterviewDetailDTO;
}