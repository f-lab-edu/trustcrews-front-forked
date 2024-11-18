import {GATEWAY_ERROR, GatewayErrorCode} from "@/app/api/_interceptor/error/constants";

export class GatewayError extends Error {
    code: GatewayErrorCode;
    cause: string;

    constructor(code: GatewayErrorCode, cause:string) {
        super(GATEWAY_ERROR[code].text);
        this.code = code;
        this.cause = cause;
    }
}

