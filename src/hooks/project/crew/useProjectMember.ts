import {useQuery} from "@tanstack/react-query";
import {ProjectMemberProfile, ResponseBody} from "@/utils/type";
import {getCrewDetail} from "@/service/project/crews";

export default function useProjectMember(projectMemberId: string) {
    const {data, isFetching} = useQuery<ResponseBody<ProjectMemberProfile>, Error>({
        queryKey: ['crewDetail', projectMemberId],
        queryFn: () => getCrewDetail(projectMemberId),
        staleTime: 0,
        // retry: false
    });

    const projectMemberInfo = data?.data || null;

    return {projectMemberInfo, isFetching};
}