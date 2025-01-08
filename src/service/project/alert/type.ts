import {AlertType, FWReason, VoteStatus} from "@/service/project/alert/constant";
import {Notice} from "@/app/project/@notice/_utils/type";
import {ProfileInfo, ProjectAuthMap, ProjectAuthMapCode} from "@/utils/type";

export type VoteStatusCode = keyof typeof VoteStatus;
export type VoteStatusType = typeof VoteStatus.VSTAT1001 | typeof VoteStatus.VSTAT1002;
export type FWReasonCode = keyof typeof FWReason;
export type FWReasonType = typeof FWReason[FWReasonCode];

export type VoteData = {
    voteId: bigint;
    voteStatus: VoteStatusType;
    agrees: number;
    disagrees: number;
    maxVoteCount: number;
}

export type VAlertRecruitData = {
    alertId: bigint;
    voteId: bigint;
    applyId: bigint;
    alertType: typeof AlertType.PRA1002;
    contents: string;
    voteStatus: VoteStatusType;
    createDate: string;
};

export type VAlertRecruitDetailData = {
    applicantInfo: ProfileInfo;
    voteInfo: VoteData & {
        applicant_id: bigint;
    };
}

export type VAlertFWCreateData = {
    project_id: bigint;
    fw_member_id: bigint;
    fw_member_auth: ProjectAuthMapCode;
    authMap: ProjectAuthMapCode;
    reason: FWReasonCode;
}

export type VAlertFWData = {
    alertId: bigint;
    voteId: bigint;
    fwMemberId: bigint;
    alertType: typeof AlertType.PRA1003;
    contents: string;
    voteStatus: VoteStatusType;
    createDate: string;
}

export type AlertCrewData = {
    alertId: bigint;
    projectId: bigint;
    aleretType: typeof AlertType.PRA2001;
    contents: string;
    createDate: string;
}

export type VAlertFWDetailData = VoteData & {
    reason: FWReasonType;
    fwMemberAuth: ProjectAuthMap;
    fwMemberPosition: {
        id: bigint;
        name: string;
    };
    fwUserProfile: string;
    fwUserNickname: string;
}

export type AlertData = Notice | VAlertRecruitData | VAlertFWData | AlertCrewData;
export type AlertMenuCode = Exclude<keyof typeof AlertType, "PRA1001" | "PRA3001">;
export type AlertMenu = typeof AlertType[AlertMenuCode];
export type AlertMenuName = AlertMenu["name"];