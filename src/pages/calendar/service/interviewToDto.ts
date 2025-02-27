import { Interview } from "../../../entities/events/model/Interview";
import { PostInterviewDetailDTO } from "../api/calendarDTOList";

export function interviewToCreateDto(interview: Interview) {
    let formattedInterviewTime = interview.interviewTime;

    if (interview.interviewTime) {
        try {
            const date = new Date(`${interview.interviewTime}:00`);
            const kstoffset = 9 * 60 * 60 * 1000;
            const kstDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000 + kstoffset);

            formattedInterviewTime = kstDate.toISOString().replace("Z", "+09:00");
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