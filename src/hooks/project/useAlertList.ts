'use client';

import {useRecoilValue} from "recoil";
import {projectIdState} from "@/store/project/ProjectInfoStateStore";
import {AlertData, AlertMenu} from "@/service/project/alert/type";
import {useQuery} from "@tanstack/react-query";
import {PageResponseBody} from "@/utils/type";
import {ITEM_COUNT} from "@/utils/constant";
import {getProjectNoticeByMenu} from "@/service/project/alert/vote/recruit";

function useAlertList(pageIndex: number, alertMenu:AlertMenu){
    const projectId = useRecoilValue(projectIdState);

    // 5초마다 백그라운드에서 알림 목록 refetch
    const {
        data,
        isFetching
    } = useQuery<Promise<PageResponseBody<AlertData[]>>, Error, PageResponseBody<AlertData[]>>({
        queryKey: ['noticeList', projectId, pageIndex, alertMenu],
        queryFn: () => getProjectNoticeByMenu(BigInt(projectId!), pageIndex, ITEM_COUNT.LIST_SM, alertMenu),
        staleTime: 0,
        // retry: false,
        refetchInterval: 60000,
        refetchIntervalInBackground: true
    });

    const alertList = data?.data.content || [];
    const totalItemsCount = data?.data.totalPages || 0;

    return {isFetching, alertList, totalItemsCount};
}

export default useAlertList;