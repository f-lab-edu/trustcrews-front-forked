import {returnFetchPublicWrapper} from "@/app/api/_interceptor/publicApi/returnFetchPublicWrapper";
import {getErrorMessageFromResponse} from "@/app/api/_interceptor/error/utils";
import {reqPLogger, resPLogger} from "@/app/api/_interceptor/utils/logger";
import {baseURL} from "@/app/api/_interceptor/utils/baseURL";

const publicApi = returnFetchPublicWrapper({
    baseUrl: baseURL,
    interceptors: {
        request: async (requestArgs) => {
            reqPLogger.i(`${requestArgs[1].method || 'GET'}: ${requestArgs[0]}`);
            return requestArgs;
        },
        response: async (response, requestArgs) => {
            const url = requestArgs[0];
            const requestInit = requestArgs[1];
            if (response.ok) {
                resPLogger.i(`${requestInit.method || 'GET'}: ${response.status} ${url}`)
                return response;
            }else{
                const errorMessage = await getErrorMessageFromResponse(response);
                resPLogger.i(`${requestInit.method}: ${response.status} ${url} - ${errorMessage}`);
                return response;
            }
        },
    },
});

export default publicApi;
