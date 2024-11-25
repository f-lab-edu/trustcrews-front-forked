import {requestWithAuth} from "@/service/request";
import {ProjectAuthMap, ProjectAuthMapCode} from "@/utils/type";
import {isEqual} from "lodash";
import {throwErrorIfInvalid} from "@/utils/common";

export type ProjectSettingCrewAuthUpdData = {
    authMap: ProjectAuthMapCode;
    projectId: bigint;
    projectMemberId: bigint;
    projectMemberAuth: ProjectAuthMapCode;
};


/**
 * 프로젝트 설정 - 크루권한 수정
 * @param reqData
 */
export const updateProjectSettingCrewAuth = async (reqData: ProjectSettingCrewAuthUpdData) => {
    throwErrorIfInvalid(isEqual(reqData.projectMemberAuth, ''), "크루 권한을 선택해 주세요.");

    return requestWithAuth("PUT", "/api/project/setting/crewAuth", reqData);
}