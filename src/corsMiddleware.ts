import {NextRequest, NextResponse} from "next/server";

const allowedOrigins = ['www.trustcrews.com, trustcrews-front-forked-kim-eun-seons-projects.vercel.app, trustcrews-front-forked-eunsun23-kim-eun-seons-projects.vercel.app'];

const corsOptions = {
    'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
}

const corsMiddleware = (request: NextRequest) => {
    const origin = request.headers.get('origin') ?? '';
    const isAllowedOrigin = allowedOrigins.includes(origin);

    const isPreflight = request.method === 'OPTIONS';

    if (isPreflight) {
        const preflightHeaders = {
            ...(isAllowedOrigin && {'Access-Control-Allow-Origin': origin}),
            ...corsOptions
        }

        return NextResponse.json({}, {headers: preflightHeaders});
    }

    const response = NextResponse.next();
    if (isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin);
    }

    Object.entries(corsOptions).forEach(([key, value]) => {
        response.headers.set(key, value);
    })

    return response;
}

export default corsMiddleware;