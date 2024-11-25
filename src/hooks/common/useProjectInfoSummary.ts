import {useQuery} from "@tanstack/react-query";
import {ProjectInfoSummary, ResponseBody} from "@/utils/type";
import {getProjectSettingInfo, ProjectSettingInfoData} from "@/service/project/setting/info";
import {numStrToBigInt} from "@/utils/common";

export function isQueryDataReady<T>(isQueryPending: boolean, isQueryError: boolean, data: T | undefined): data is T {
    return !isQueryPending && !isQueryError;
}

export default function useProjectInfoSummary(projectId: string) {
    const {
        data,
        error,
        isPending,
        isRefetching,
        isError,
        isRefetchError
    } = useQuery<ResponseBody<ProjectInfoSummary>, Error, ResponseBody<ProjectInfoSummary>>({
        queryKey: ['projectInfoSummary', projectId],
        queryFn: () => getProjectSettingInfo(numStrToBigInt(projectId)),
    });

    return {data, error, isPending, isRefetching, isError, isRefetchError};
}