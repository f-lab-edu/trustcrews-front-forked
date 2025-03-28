import {NextRequest, NextResponse} from "next/server";
import corsMiddleware from "@/corsMiddleware";

import {isAuthorizedRequest} from "@/utils/isAuthorizedRequest";

export default function middleware(request: NextRequest) {
    if (!isAuthorizedRequest(request)) return NextResponse.redirect(new URL('/login', request.url));

    if (request.nextUrl.pathname.startsWith('/api')) return corsMiddleware(request);

    return NextResponse.next();

}

