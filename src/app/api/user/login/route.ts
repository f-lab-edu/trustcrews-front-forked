import publicApi from "@/app/api/_interceptor/publicApi";
import {NextRequest} from "next/server";
import {cookies} from "next/headers";
import {getRefreshToken} from "@/utils/common";
import {routeResponse} from "@/app/api/_interceptor/routeResponse";
import {GatewayError} from "@/app/api/_interceptor/error/classes";

export async function POST(req: NextRequest) {
    const loginRequest = await req.json();

    const res = await publicApi("/api/user/login/public", {
        method: "POST",
        body: JSON.stringify(loginRequest),
        credentials: "include",
    });

    if (res.ok) {
        const {headers} = res;
        const accessToken = headers.get("Authorization");
        const setCookieHeader = headers.get("Set-Cookie");

        const cookieStore = cookies();
        if (accessToken && setCookieHeader) {
            const {token, options} = getRefreshToken(setCookieHeader);
            cookieStore.set("Access", accessToken, {...options, sameSite:'strict'});
            cookieStore.set("Refresh", token, {...options, sameSite:'strict'});

        }else{
            throw new GatewayError("EAUTH", `Token refresh response did not contain necessary headers: Empty - ${!accessToken && 'Access,'} ${!setCookieHeader && 'Set-Cookie Header'}`);
        }

        const copiedRes = res.clone();
        const resData = await copiedRes.json();
        cookieStore.set("user_id", resData.data!);
    }

    return routeResponse(req, res);
}