import "server-only";
import {refreshToken} from "@/app/api/_interceptor/authApi/refreshToken";
import {
    addToRetryRequests,
    addToRevalidatingUsers,
    deleteFromRevalidatingUsers,
    isRevalidatingUser,
    processRetryRequests
} from "@/app/api/_interceptor/authApi/refreshQueue";
import {processPendingRequest} from "@/app/api/_interceptor/authApi/pendingRequestQueue";
import {COOKIE, getCookieValue} from "@/app/api/_interceptor/utils/cookieUtils";
import {reqLogger, resLogger} from "@/app/api/_interceptor/utils/logger";
import {returnFetchWrapper} from "@/app/api/_interceptor/authApi/returnFetchWrapper";
import {GatewayError} from "@/app/api/_interceptor/error/classes";
import {baseURL} from "@/app/api/_interceptor/utils/baseURL";
import {getErrorMessageFromResponse} from "@/app/api/_interceptor/error/utils";


const authApi = returnFetchWrapper({
    baseUrl: baseURL,
    interceptors: {
        request: async (requestArgs) => {
            try {
                const requestInit = requestArgs[1];
                const accessToken = getCookieValue(COOKIE.ACS_TOKEN);

                // 액세스 토큰 세팅
                const headers = new Headers(requestInit.headers);
                headers.set("Authorization", `Bearer ${accessToken}`);
                requestInit.headers = headers;

                if (requestInit.body instanceof FormData) {
                    const headers = new Headers(requestInit.headers);
                    headers.delete('Content-Type');
                    requestInit.headers = headers;
                }

                reqLogger.i(`${requestInit.method}: ${requestArgs[0]}`);
            } catch (error: unknown) {
                throw new GatewayError('ESENDREQ', (error as Error).message);
            }

            return requestArgs;
        },
        response: async (response, requestArgs) => {
            const url = requestArgs[0];
            const requestInit = requestArgs[1];

            if (response.ok) { // 성공 응답
                resLogger.i(`${requestInit.method} ${response.status}:  ${url}`);
                return response;
            }

            if(response.status !== 401){
                const errorMessage = await getErrorMessageFromResponse(response);
                resLogger.i(`${requestInit.method} ${response.status}:  ${url} - ${errorMessage}`);
                return response;
            }

            const userId = getCookieValue(COOKIE.USER_ID);
            const retryOriginalRequest = new Promise<Response>((resolve, reject) => {
                addToRetryRequests(userId, async (error: Error | null) => {
                        if (error) {  // 토큰 재발급 실패
                            reject(error);
                        } else { // 토큰 재발급 성공 - retry
                            try {
                                const newAccessToken = getCookieValue(COOKIE.ACS_TOKEN);
                                const headers = new Headers(requestInit.headers);
                                headers.set("Authorization", `Bearer ${newAccessToken}`);

                                // body가 FormData일 경우 fetch시 자동으로 Content-Type 설정하도록
                                if (requestInit.body instanceof FormData) {
                                    headers.delete('Content-Type');
                                }
                                requestInit.headers = headers;
                            } catch (error: unknown) {
                               throw new GatewayError('ESENDREQ', (error as Error).message);
                            }

                            const retryResponse = await authApi(...requestArgs);
                            resolve(retryResponse);
                        }
                    }
                )
            });

            if (!isRevalidatingUser(userId)) {  // 계정당 최초 토큰 재발급 요청 1개만 수행
                addToRevalidatingUsers(userId);
                try {
                    await refreshToken();
                    // 재발급 요청 완료되면 계정의 대기중인 모든 요청 수행
                    processRetryRequests(userId, null);
                    processPendingRequest(userId, null);
                } catch (error: unknown) {
                    processRetryRequests(userId, error as Error);
                    processPendingRequest(userId, error as Error);
                } finally {
                    deleteFromRevalidatingUsers(userId)
                }
            }
            return retryOriginalRequest;
        }
    }
});


export default authApi;
