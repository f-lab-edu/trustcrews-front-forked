import {useQuery} from "@tanstack/react-query";
import {ResponseBody} from "@/utils/type";
import {getProjectSettingBoardInfo, ProjectSettingBoardData} from "@/service/project/setting/board";

export default function useProjectSettingBoardInfo(projectId: bigint) {
    const {
        data,
        isFetching
    } = useQuery<ResponseBody<ProjectSettingBoardData>, Error, ResponseBody<ProjectSettingBoardData>>({
        queryKey: ['projectSettingBoardInfo'],
        queryFn: () => getProjectSettingBoardInfo(projectId),
        staleTime: 0
    });

    return {data, isFetching};
}