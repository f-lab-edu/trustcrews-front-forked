import {VoteRecruitReqData} from "@/service/project/vote/type";
import {requestWithAuth} from "@/service/request";

/**
 * 프로젝트 "모집" 투표
 * @param reqData
 */
export const voteForProjectRecruit = async (reqData: VoteRecruitReqData) => {
    return await requestWithAuth("POST", '/api/project/vote/recruit', reqData);
}