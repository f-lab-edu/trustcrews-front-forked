import {handleResponse, requestWithAuth} from "@/service/request";
import {ResponseBody} from "@/utils/type";

const publicURL = process.env.NEXT_PUBLIC_URL;

export interface UpdateUserInfo {
    nickname: string;
    positionId: bigint;
    techStackIds: bigint[];
    intro: string;
}

export const checkNickname = async (nickname: string) => {
    const response = await fetch(
        `${publicURL}/api/user/nickname?nickname=${nickname}`
    );
    return response.json();
};

export const getSimpleUser = async () => {
    return await requestWithAuth('GET', '/api/user/simple');
};

export const getUserIfo = async () => {
    return await requestWithAuth('GET', `/api/user`);
};

export const updateUser = async (
    updateData: UpdateUserInfo,
    file: File | null
) => {
    const formData = new FormData();
    formData.set(
        "updateRequestDto",
        new Blob([ JSON.stringify(updateData, (k, v) => (typeof v === 'bigint' ? Number(v) : v))], {
            type: "application/json",
        }),
    );

    if (file) {
        formData.set("file", file);
    }

    const res = await fetch(`${publicURL}/api/user`, {
        method:'PUT',
        cache: 'no-cache',
        body: formData
    });

    return await handleResponse(res);
};

/**
 * 현재 사용자 프로젝트 이력 조회
 * @param pageNumber
 */
export const getUserMeProjectHistory = async (pageNumber: number) => {
    return await requestWithAuth('GET', `/api/user/history-me?pageNumber=${pageNumber}`)
};

/**
 * 특정 사용자 프로젝트 이력 조회
 * @param pageNumber
 * @param userId
 */
export const getUserProjectHistory = async (pageNumber:number, userId: bigint) => {
    return await requestWithAuth('GET', `/api/user/history?pageNumber=${pageNumber}&userId=${userId}`);
}

/**
 *
 */
export const getTrustGradeListByUser = async () => {
    return await requestWithAuth('GET', '/api/user/trust-grade');
};

export const deleteProfileImage = async () => {
    return await requestWithAuth('DELETE', '/api/user/profile-img');
};

/**
 * 일반 사용자 정보 조회
 * @param userId
 */
export const getUserInfoByUserId = async (userId: string | bigint) => {
    return await requestWithAuth('GET', `/api/user/general?userId=${userId}`);
}