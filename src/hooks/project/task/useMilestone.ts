import {useQuery} from "@tanstack/react-query";
import {MilestoneInfo, ResponseBody} from "@/utils/type";
import {getMilestone} from "@/service/project/milestone";

export default function useMilestone(milestoneId: string, enabled = true) {
    const {data, isFetching} = useQuery<ResponseBody<MilestoneInfo>, Error, ResponseBody<MilestoneInfo>>({
        queryKey: ['milestone', milestoneId],
        queryFn: () => getMilestone(milestoneId),
        staleTime: 0,
        enabled: enabled
    });

    return {milestoneInfo: data?.data || null, isFetching};
}