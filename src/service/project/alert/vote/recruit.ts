import {requestWithAuth} from "@/service/request";
import {AlertMenu, VAlertRecruitDetailData} from "@/service/project/alert/type";
import {ResponseBody} from "@/utils/type";


/**
 * 프로젝트 투표 알림 상세 조회 - “모집”
 * @param alertId
 * @param applyId
 * @param voteId
 */
export const getVAlertRecruitDetail = async (alertId: bigint, applyId: bigint, voteId: bigint): Promise<ResponseBody<VAlertRecruitDetailData>> => {
    const reqUrl = `/api/project/alert/vote/recruit/detail?alertId=${alertId}&applyId=${applyId}&voteId=${voteId}`;
    return await requestWithAuth("GET", reqUrl);
}

/**
 * 프로젝트 알림 전체/타입별 목록 조회
 * @param projectId
 * @param pageIndex
 * @param itemCount
 * @param noticeMenu
 */
export async function getProjectNoticeByMenu(
    projectId: bigint,
    pageIndex: number,
    itemCount: number,
    noticeMenu: AlertMenu
) {
    const reqParam = `?projectId=${projectId}&pageIndex=${pageIndex}&itemCount=${itemCount}`;
    const method = "GET";
    switch (noticeMenu.name) {
        case "모집":
            return await requestWithAuth(method, '/api/project/alert/vote/recruit' + reqParam);
        case "강제탈퇴":
            return await requestWithAuth(method, '/api/project/alert/vote/fwithdraw' + reqParam);
        case "크루":
            return await requestWithAuth(method, '/api/project/alert/crew' + reqParam);
    }
}