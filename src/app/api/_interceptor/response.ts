import {ResponseBody} from "@/utils/type";
import {COOKIE, deleteCookieValue, getCookieValue} from "@/app/api/_interceptor/utils/cookieUtils";
import {deleteUserRefToken} from "@/app/api/_interceptor/authApi/refreshToken";
import {extractErrorCode} from "@/app/api/_interceptor/error/utils";
import {GATEWAY_ERROR, GatewayErrorCode} from "@/app/api/_interceptor/error/constants";


export type CustomResponseHeaderInit = HeadersInit & {
    'X-Error-Instruction'?: 'REDIRECT' | 'MESSAGE' | 'NONE';
};
export type CustomResponseInit = ResponseInit & {
    headers: CustomResponseHeaderInit;
}

export class CustomResponse extends Response {
    constructor(body?: (BodyInit | null | undefined), init?: (CustomResponseInit | undefined)) {
        super(body, init);
    }
}

/**
 * 커스텀 에러 Response 생성
 * @param errorCode
 */
const errorResponse = (errorCode: GatewayErrorCode) => {
    const responseBody: ResponseBody<null> = {
        result: 'fail',
        message: GATEWAY_ERROR[errorCode].text,
        data: null
    };

    const headers: CustomResponseHeaderInit = {'X-Error-Instruction': 'NONE'};

    return new CustomResponse(JSON.stringify(responseBody), {status: GATEWAY_ERROR[errorCode].status, headers});
}


/**
 * Gateway 에러 Response 생성
 * @param error
 */
export const createErrorResponse = async (error: Error) => {
    let errorCode:GatewayErrorCode = "EDEFAULT";

    try{
        errorCode = extractErrorCode(error);
    }catch(e){
        console.error((e as Error).cause);
    }

    if (errorCode === 'EAUTH') {
        deleteCookieValue(COOKIE.ACS_TOKEN);
        deleteCookieValue(COOKIE.REF_TOKEN);
        deleteCookieValue(COOKIE.USER_ID);
        deleteUserRefToken(getCookieValue(COOKIE.USER_ID));
    }

    return errorResponse(errorCode);
}

