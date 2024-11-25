import {requestWithAuth} from "@/service/request";
import {NoticeCreateForm} from "@/utils/type";


/**
 * 업무 알림 생성
 * @param status
 * @param userNickname
 * @param noticeCreateForm
 */
export async function createProjectTaskNotice(noticeCreateForm: NoticeCreateForm) {
    return await requestWithAuth('POST', '/api/project/notice/task', {...noticeCreateForm});
}



