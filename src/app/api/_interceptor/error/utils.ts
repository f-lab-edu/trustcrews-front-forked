import {GATEWAY_ERROR, GatewayErrorCode} from "@/app/api/_interceptor/error/constants";
import {GatewayError} from "@/app/api/_interceptor/error/classes";



export const isGatewayErrorCode = (arg: string): arg is GatewayErrorCode => {
    return GATEWAY_ERROR[arg as GatewayErrorCode] !== undefined;
}


export const isGatewayError = (arg: Error): arg is GatewayError => {
    const code = (arg as GatewayError).code;
    return (arg as GatewayError).code && isGatewayErrorCode(code);
}



/**
 * 커스텀 에러 Response body의 message
 * @param errorCode
 */
export const errorResponseMessage = (errorCode: string) => {
    if (isGatewayErrorCode(errorCode)) {
        return GATEWAY_ERROR[errorCode].text;
    } else {
        return GATEWAY_ERROR.EDEFAULT.text;
    }
}

export const getErrorMessageFromResponse = async (response: Response): Promise<string> => {
    try {
        const copied = response.clone();
        const resBody = await copied.json();
        return resBody.message;
    } catch (error: unknown) {
        throw new GatewayError('EPARSERES', (error as Error).message);
    }
}

export type ErrorWithCauseCode = Error & {
    cause: {
        code: GatewayErrorCode;
        stack?: string;
        errors?: Error[];
    }
}

export const isErrorWithCauseCode = (arg: Error): arg is ErrorWithCauseCode => {
    const error = arg as ErrorWithCauseCode;
    return error.cause &&
        error.cause.code !== undefined &&
        isGatewayErrorCode(error.cause.code);
}

export const extractErrorCode = (error: Error): GatewayErrorCode => {
    if (isGatewayError(error)) {
        return error.code;
    } else if (isErrorWithCauseCode(error)) {
        return error.cause.code;
    } else {
        throw new Error("Failed to extract error code", {cause: error});
    }
}

