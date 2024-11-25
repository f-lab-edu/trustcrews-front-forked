import {requestWithAuth} from "@/service/request";
import {Position, PostInfoSummary, ProjectAuthMap, ProjectAuthMapCode} from "@/utils/type";

export type BoardPosition = {
    boardPositionId: bigint;
    position: Position;
}

export interface ProjectSettingBoardData extends PostInfoSummary {
    content: string;
    contact: string;
}

/**
 * 프로젝트 세팅 - 프로젝트 게시글 정보 조회
 * @param projectId
 */
export const getProjectSettingBoardInfo = async (projectId: bigint) => {
    return await requestWithAuth("GET", `/api/project/setting/board?projectId=${projectId}`);
}

export type ProjectSettingBoardUpdReqData = {
    projectId: bigint;
    boardId: bigint;
    authMap: ProjectAuthMapCode;
    title: string;
    content: string;
    recruitmentStatus: boolean | null;
    contact: string;
    positionIds: bigint[];
};

/**
 * 프로젝트 세팅 - 프로젝트 게시글정보 수정
 * @param reqData
 */
export const updateProjectSettingBoard = async (reqData: ProjectSettingBoardUpdReqData) => {
    return await requestWithAuth("PUT", "/api/project/setting/board", reqData);
}