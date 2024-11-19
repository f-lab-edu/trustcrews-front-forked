import {request, requestWithAuth} from "@/service/project/request";
import {ProjectAuthMap, ProjectAuthMapCode, TechStackItem} from "@/utils/type";
import {isEqual} from "lodash";
import {throwErrorIfInvalid} from "@/utils/common";

export type ProjectSettingInfoData = {
    projectId: bigint;
    projectName: string;
    projectSubject: string;
    startDate: string;
    endDate: string;
    technologyStacks: TechStackItem[];
}
/**
 * 프로젝트 세팅 - 프로젝트 정보 조회
 * @param projectId
 */
export const getProjectSettingInfo = async (projectId: bigint) => {
    return await request("GET", `/api/project/setting/info?projectId=${projectId}`);
}

export type ProjectSettingInfoUpdReqData = {
    projectId: bigint;
    authMap: ProjectAuthMapCode;
    projectName: string;
    projectSubject: string;
    startDate: string;
    endDate: string;
    technologyIds: bigint[];
}

/**
 * 프로젝트 세팅 - 프로젝트 정보 수정
 * @param reqData
 */
export const updateProjectSettingInfo = async (reqData: ProjectSettingInfoUpdReqData) => {
    throwErrorIfInvalid(isEqual(reqData.projectName, ''), '프로젝트 이름을 입력해주세요');
    throwErrorIfInvalid(isEqual(reqData.projectSubject, ''), '프로젝트 주제를 입력해주세요');
    throwErrorIfInvalid(isEqual(reqData.startDate, ''), '프로젝트 시작날짜를 입력해주세요');
    throwErrorIfInvalid(isEqual(reqData.endDate, ''), '프로젝트 종료날짜를 입력해주세요');
    throwErrorIfInvalid(isEqual(reqData.technologyIds, []), '프로젝트 기술스택을 선택해주세요.');

    return await requestWithAuth("PUT", "/api/project/setting/info", reqData);
}