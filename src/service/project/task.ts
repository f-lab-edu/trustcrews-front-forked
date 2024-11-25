import {requestWithAuth} from "@/service/project/request";
import {PageResponseBody, ProjectAuthMapCode} from "@/utils/type";
import {TasksReqParam} from "@/hooks/project/task/useTasks";
import {TaskItem, TaskStatusValueType} from "@/app/project/@task/_utils/type";
import {isEqual} from "lodash";
import {TASK_STATUS} from "@/app/project/@task/_utils/constant";

/**
 * 업무 목록 조회
 * @param milestoneId
 * @param projectId
 * @param pageIndex
 * @param itemCount
 */
export async function getTaskList(tasksReqParam: TasksReqParam) {
    const {
        milestoneId,
        projectId,
        pageNumber: pageIndex,
        itemsPerPage: itemCount
    } = tasksReqParam;

    const res: PageResponseBody<TaskItem[]> = await requestWithAuth(
        'GET',
        `/api/project/work?milestoneId=${milestoneId}&projectId=${projectId}&pageIndex=${pageIndex}&itemCount=${itemCount}`
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const updated = res.data.content.map((v) => {
        if (v.progressStatus.name === "완료") {
            return v;
        } else {
            const startDate = v.startDate;
            const y = parseInt(startDate.substring(0, 4), 10);
            const m = parseInt(startDate.substring(4, 6), 10) - 1;
            const d = parseInt(startDate.substring(6, 8), 10);
            const date = new Date(y, m, d);

            if (date.getTime > today.getTime) {
                return {...v, progressStatus: TASK_STATUS.PS001}
            } else {
                return {...v, progressStatus: TASK_STATUS.PS002}
            }
        }
    });

    return {
        ...res,
        content: updated
    }
}


export type TaskCreateReqData = {
    projectId: bigint;
    milestoneId: bigint;
    content: string;
    startDate: string;
    endDate: string;
    contentDetail: string;
    assignedUserId: bigint;
};

/**
 * 업무 생성
 * @param task
 */
export async function createTask(task: TaskCreateReqData) {
    if (isEqual(task.assignedUserId, 0n)) throw Error('업무 담당자를 선택해 주세요');
    if (!task.content) throw Error('업무 제목을 입력해주세요');
    if (!task.startDate) throw Error('시작 날짜를 입력해주세요');
    if (!task.endDate) throw Error('시작 날짜를 입력해주세요');
    if (!task.contentDetail) throw Error('할 일을 입력해주세요.');

    return await requestWithAuth('POST', '/api/project/work', task);

}


export type TaskModifyReqData = TaskCreateReqData & {
    workId: bigint;
    progressStatus: TaskStatusValueType;
    authMap: ProjectAuthMapCode;
};

/**
 * 업무 수정
 * @param task
 */
export async function updateTask(task: TaskModifyReqData) {
    if (task.assignedUserId === 0n) throw Error('업무 담당자를 선택해 주세요');
    if (!task.content) throw Error('업무 제목을 입력해주세요');
    if (!task.startDate) throw Error('시작 날짜를 입력해주세요');
    if (!task.endDate) throw Error('시작 날짜를 입력해주세요');
    if (!task.contentDetail) throw Error('할 일을 입력해주세요.');
    if (!task.progressStatus) throw Error('업무 진행상태를 선택 해주세요');

    return await requestWithAuth('PATCH', '/api/project/work', task);
}


export type TaskDeleteReqData = {
    workId: bigint;
    authMap: ProjectAuthMapCode;
}

/**
 * 업무 삭제
 * @param reqData
 */
export async function deleteTask(reqData: TaskDeleteReqData) {
    return await requestWithAuth('DELETE', '/api/project/work', reqData);
}