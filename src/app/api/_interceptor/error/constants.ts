import {HttpStatus} from "@/app/api/_interceptor/utils/httpStatus";

export const GATEWAY_ERROR = {
    ECONNREFUSED: {text: "현재 서비스를 이용하실 수 없습니다. 빠른 시일 내에 복구하도록 하겠습니다.", status: HttpStatus.SERVICE_UNAVAILABLE},
    ENOTFOUND: {text: "요청하신 주소를 찾을 수 없습니다. URL 확인 후 다시 시도해주세요.", status: HttpStatus.NOT_FOUND},
    ESENDREQ: {text: "요청 전송에 실패했습니다.", status: HttpStatus.INTERNAL_SERVER_ERROR},
    EDEFAULT: {text: "프로세스 수행 중 오류가 발생했습니다.", status: HttpStatus.INTERNAL_SERVER_ERROR},
    EPARSERES: {text: "요청하신 정보에 접근 할 수 없습니다.", status: HttpStatus.BAD_GATEWAY},
    EAUTH: {text: "유효하지 않은 인증정보로 인해 사용자 인증에 실패했습니다. 다시 로그인해주세요.", status: HttpStatus.UNAUTHORIZED}
} as const;
export type GatewayErrorCode = keyof typeof GATEWAY_ERROR;
