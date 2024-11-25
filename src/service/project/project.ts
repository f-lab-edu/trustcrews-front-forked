import {requestWithAuth} from "@/service/request";
import {ResponseBody} from "@/utils/type";
import {sortByStartDate} from "@/utils/common";


/**
 * 프로젝트 목록 조회
 */
export async function getMyProjectList(pageIndex: number, itemCount: number) {
    const resBody = await requestWithAuth('GET', `/api/project/list?pageIndex=${pageIndex}&itemCount=${itemCount}`);

    return {
        ...resBody,
        data: resBody.data ? {
            totalPages: resBody.data.totalPages,
            content: resBody.data.content ? sortByStartDate(resBody.data.content, 'desc') : []
        } : null
    }
}


/**
 * 프로젝트 종료
 * @param projectId
 */
export async function endProject(projectId: string | bigint) {
    return await requestWithAuth('POST', '/api/project', {projectId});
}

/**
 * 현재 사용자의 프로젝트 멤버 권한 조회
 * @param projectId
 */
export async function getCurrentUserProjectMemberAuth(projectId: string | bigint) {
    const _projectId = typeof projectId === 'string' ? BigInt(projectId) : projectId;

    return await requestWithAuth("GET", `/api/project/currentUserAuth?projectId=${_projectId}`);
}