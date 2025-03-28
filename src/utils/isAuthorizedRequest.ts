import 'server-only';
import {NextRequest} from "next/server";
import {COOKIE} from "@/app/api/_interceptor/utils/cookieUtils";

export const isAuthorizedRequest = (request: NextRequest) => {
    const authRouteMatcher = new RegExp(/(\/api)*\/(((project|user)(\/(?!(login|signup))).*)|((project|user)\s))/, 'i');
    if (!authRouteMatcher.test(request.nextUrl.pathname)) return true;

    return request.cookies.has(COOKIE.ACS_TOKEN) && request.cookies.has(COOKIE.REF_TOKEN);
}