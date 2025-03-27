import {cookies} from "next/headers";
import {getRefreshToken} from "@/utils/common";
import {COOKIE, getCookieValue} from "@/app/api/_interceptor/utils/cookieUtils";
import {reqLogger, resLogger} from "@/app/api/_interceptor/utils/logger";
import {GatewayError} from "@/app/api/_interceptor/error/classes";
import {baseURL} from "@/app/api/_interceptor/utils/baseURL";

const userRefToken: Map<string, string> = new Map();

export const getUserRefToken = (userId: string) => userRefToken.get(userId);
export const setUserRefToken = (userId: string, token: string) => userRefToken.set(userId, token);
export const deleteUserRefToken = (userId: string) => userRefToken.delete(userId);

export async function refreshToken(): Promise<void> {
    const userId = getCookieValue(COOKIE.USER_ID);
    let refreshToken = getUserRefToken(userId);

    if (refreshToken === undefined) {
        refreshToken = getCookieValue(COOKIE.REF_TOKEN);
        setUserRefToken(userId, refreshToken);
    }

    if (!userId || !refreshToken) {
        throw new GatewayError("ESENDREQ", "No available userId or refreshToken");
    }

    const requestURL = `${baseURL}/api/user/token-reissue`;
    const requestMethod = "POST";
    reqLogger.i(`${requestMethod}: ${requestURL}`);

    const tokenResponse = await fetch(requestURL, {
        method: requestMethod,
        body: JSON.stringify({userId}),
        headers: {
            "Content-Type": "application/json",
            Cookie: `Refresh=${refreshToken}`,
        },
        credentials: "include",
    });

    if (!tokenResponse.ok) { // 토큰 재발급 실패
        resLogger.i(`${requestMethod} ${tokenResponse.status}: ${requestURL}`);
        throw new GatewayError('EAUTH', 'Failed to refresh token');
    }

    const {headers} = tokenResponse;
    const accessToken = headers.get("Authorization");
    const setCookieHeader = headers.get("Set-Cookie");

    if (accessToken && setCookieHeader) { // 액세스 & 리프레쉬 토큰 세팅
        const {token, options} = getRefreshToken(setCookieHeader);
        const cookieStore = cookies();
        cookieStore.set(COOKIE.ACS_TOKEN, accessToken, {...options, sameSite:'strict'});
        cookieStore.set(COOKIE.REF_TOKEN, token, {...options, sameSite:'strict'});
        setUserRefToken(userId, cookieStore.get(COOKIE.REF_TOKEN)!.value);
        resLogger.i(`TOKEN-REFRESH-SUCCESS`);
    } else {
        throw new GatewayError("EAUTH", "Token refresh response did not contain necessary headers");
    }
}