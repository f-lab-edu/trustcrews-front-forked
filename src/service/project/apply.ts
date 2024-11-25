import {requestWithAuth} from "@/service/request";
import {ConstantDto, PageResponseBody} from "@/utils/type";


/**
 * 프로젝트 지원
 * @param projectId
 * @param positionId
 */
export async function applyProject(projectId: bigint, positionId: bigint) {
    return await requestWithAuth('POST', `/api/project/apply?projectId=${projectId}`,
        {positionId, projectId, apply_message: "기본 메세지"});
}

export type ProjectApplyStatusCode = "PAS1001" | "PAS1002" | "PAS1003";

export type ProjectApplyDto = {
    project_apply_id: bigint;
    project_id: bigint;
    project_name: string;
    position_name: string;
    status: ConstantDto<ProjectApplyStatusCode>;
    apply_message: string;
    createDate: string;
}



/**
 * 프로젝트 지원 목록 조회
 * @param pageIndex
 * @param itemCount
 */
export async function getMyProjectApplies(pageIndex: number, itemCount: number): Promise<PageResponseBody<ProjectApplyDto[]>> {
    return await requestWithAuth('GET', `/api/project/apply?pageIndex=${pageIndex}&itemCount=${itemCount}`);
}

//  const getUserProjectNotice = async (pageIndex: number, ITEM_COUNT: number) => {
//         const res = await getMyProjectApplies(pageIndex, ITEM_COUNT);
//         if (res.result !== 'success') {
//             throw new Error('프로젝트 지원 현황 조회에 실패했습니다.');
//         }
//
//         return res;
//     }