import {CREW_STATUS} from "@/utils/constant";
import {PointTypeKey} from "@/app/project/@notice/_utils/type";
import {TrustGradeNameType, TrustGradeValueType} from "@/app/project/@setting/_utils/type";
import {ProjectApplyStatusCode} from "@/service/project/apply";
import {VoteStatusCode} from "@/service/project/alert/type";
import {BoardPosition, ProjectSettingBoardData} from "@/service/project/setting/board";
import {UserProjectHistoryStatus} from "@/service/user/constant";

export type DropDownItem = {
    name: string;
    value: string;
    onClickHandler?: (value: string) => void;
}

export interface DropDownProps {
    items: DropDownItem[];
}

export interface BadgeProps {
    color?: string;
    size?: string;
    text?: string;
}

export type SelectItem<T, V> = {
    name: T;
    value: V;
}

export interface SelectProps<T, V> {
    items: readonly SelectItem<T, V>[];
    value: SelectItem<T, V>;
    setValue: (item: SelectItem<T, V>) => void;
    label?: string;
    placeholder?: string;
    required?: boolean;
}


export type MultiSelectProps<T, V> = {
    items: readonly SelectItem<T, V>[];
    values: readonly SelectItem<T, V>[];
    setValues: (value: readonly SelectItem<T, V>[]) => void;
    value?: SelectItem<T, V> | null;
    setValue?: (value: SelectItem<T, V>) => void;
    label?: string;
    placeholder?: string;
    required?: boolean;
}

export interface ModalState {
    title: string;
    isOpen: boolean;
}

export interface ConfirmModalState extends ModalState {
    content: string | React.JSX.Element;
    onClickConfirmHandler: () => void;
}

export interface MilestoneInfo {
    milestoneId: bigint;
    projectId: bigint | string;
    content: string;
    createDate: string;
    startDate: string;
    endDate: string;
    updateDate: string;
    index?: number;
    authMap?: ProjectAuthMap;
}

export interface TrustGradeItem {
    trustGradeId: TrustGradeValueType;
    trustGradeName: TrustGradeNameType;
}

export interface PositionItem {
    positionId: bigint;
    positionName: string;
}

export type PositionId = PositionItem['positionId'];
export type PositionName = PositionItem['positionName'];

export interface TechStackCategory {
    techStackCategoryId: bigint;
    techStackCategoryName: string;
}

export interface TechStackItem {
    techStackId: bigint;
    techStackName: string;
}

export type TechStackValueType = TechStackItem['techStackId'];
export type TechStackNameType = TechStackItem['techStackName'];

export interface TechStackWithCategory extends TechStackItem {
    categories: string[];
}

export interface ProfileInfo {
    userId: bigint | null;
    email: string;
    nickname: string;
    profileImgSrc?: string | null;
    trustScore: number;
    trustGrade: TrustGradeItem;
    position: PositionItem;
    techStacks: TechStackItem[];
    intro?: string;
    projectHistoryTotalCount: number;
    createDate: string;
    updateDate: string;
}

// 사용자 프로젝트 이력 status 데이터 타입
export type UserProjectHistoryStatusCode = keyof typeof UserProjectHistoryStatus;
export type UserProjectHistoryStatus = typeof UserProjectHistoryStatus[UserProjectHistoryStatusCode];

export interface UserProjectHistoryData {
    userProjectHistoryId: bigint;
    projectId: bigint;
    status: UserProjectHistoryStatus;
    projectName: string;
    updateDate: string;
}

export type PostInfoSummary = {
    boardId: bigint;
    title: string;
    recruitmentStatus: boolean;
    boardPositions: BoardPosition[];
};

export interface PostCardInfo extends PostInfoSummary {
    project: ProjectInfoSummary;
    boardPageView: number;
    user: {
        email: string;
        nickname: string;
        profileImgSrc: string | null;
        trustGrade: TrustGrade;
    };
    createDate: string;
    updateDate: string;
}

export type ResponseResult = 'success' | 'fail';

export type ResponseBody<T> = {
    result: ResponseResult;
    message: string;
    data: T | null;
}

export type Paged<T> = {
    content: T,
    totalPages: number;
}

export type PageResponseBody<T> = {
    result: ResponseResult;
    message: string;
    data: T extends null ? null : Paged<T>;
}

export interface TrustGrade {
    name: TrustGradeNameType;
    minimumScore: number;
    maximumScore: number;
}

export interface User {
    userId: bigint;
    email: string;
    nickname: string;
    profileImgSrc: string;
}

export interface ProjectUser extends User {
    position: Position;
    trustGrade: TrustGrade;
    trustScore: number;
    role: string;
    createDate: string;
    updateDate: string;
    technologyStacks: TechStackItem[];
}

export interface ProjectMemberProfile {
    projectMemberId: bigint;
    projectId: bigint;
    projectCount: number;
    user: ProjectUser;
    projectMemberAuth: ProjectAuthMap;
    position: Position;
    status: CrewStatusKeys;

}

export interface ProjectMember {
    projectMemberId: bigint;
    user: User;
    projectMemberAuth: ProjectAuthMap;
    position: Position;
    lastWorkDate: string;
}

export interface Position {
    positionId: bigint;
    name: string;
}


export type ProjectAuthMap = {
    code: string;
    name: string;
    workChangeYN: boolean;
    milestoneChangeYN: boolean;
    configYn: boolean;
};

export type ProjectAuthMapCode = ProjectAuthMap['code'];

export type ProjectInfoSummary = {
    projectId: bigint;
    projectName: string;
    projectSubject: string;
    startDate: string;
    endDate: string;
    technologyStacks: TechStackItem[];
};

/**
 * 프로젝트 모집 게시글 - 모집 포지션
 */
export interface PostDetailPosition {
    boardPositionId: bigint;
    position: Position;
}

/**
 * 프로젝트 모집 게시글 - 게시글 상세
 */
export type PostInfo = ProjectSettingBoardData & {
    pageView: number;
    user: {
        userId: bigint;
        nickName: string;
        userProfileImgSrc: string | null;
    };
    createDate: string;
    updateDate: string;
}


export type SnackbarType = "INFO" | "ERROR" | "SUCCESS";

export interface SnackbarState {
    show: boolean;
    type: SnackbarType;
    content: string;
    duration?: number;
}


export interface NoticeCreateForm {
    projectId: bigint;
    checkUserId?: bigint | null;
    sendUserId?: bigint | null;
    workId?: bigint | null;
    milestoneId?: bigint | null;
    positionId?: bigint | null;
    type: string;
    content: string;
}

/**
 * CREW_STATUS enum의 키값 타입
 */
export type CrewStatusKeys = keyof typeof CREW_STATUS;

/**
 * 프로젝트 크루 업무 이력
 */
export interface CrewTaskHistory {
    workId: bigint;
    trustScoreHistoryId: bigint;
    workContent: string;
    createDate: string;
    progressStatus: CrewStatusKeys;
    point: number | null;
    point_type: PointTypeKey | null;
}

export interface UserBasicInfo {
    nickname: string;
    profileImgSrc: string;
}

export interface UserProjectNotice {
    alertId: bigint;
    project: {
        projectId: bigint;
        projectName: string;
    };
    position: PositionItem;
    supportResult: boolean | null;
}

export type DataId = string | bigint;

export type ArrayValue<T> = T extends () => IterableIterator<infer U> ? U : never;

export type ButtonTheme =
    | "primary"
    | "primary-hollow"
    | "disabled"
    | "disabled-hollow"
    | "cancel"
    | "black"
    | "black-hollow"
    | "danger";

export type ButtonSize = "sm" | "md" | "lg" | "xl";

export type ConstantDto<T> = {
    code: T;
    name: string;
}

export type StatusCode = ProjectApplyStatusCode | VoteStatusCode | string;