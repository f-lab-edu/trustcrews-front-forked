'use client';
import {useQuery} from "@tanstack/react-query";
import {ProjectMember, ResponseBody} from "@/utils/type";
import {getProjectCrewList} from "@/service/project/crews";

export default function useProjectCrewList(projectId:string) {
    const {data:res, isFetching} = useQuery<ResponseBody<Record<'projectMembers', ProjectMember[]>>, Error>({
        queryKey: ['crewList', projectId],
        queryFn: () => getProjectCrewList({projectId}),
        staleTime: 0,
        // retry: false
    });

    return {crewList: res?.data?.projectMembers || [], isFetching};
}