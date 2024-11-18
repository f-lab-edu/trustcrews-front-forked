import {HTTP_METHOD} from "next/dist/server/web/http";
import {JSONReplaceBigInt} from "@/utils/common";
import {ResponseBody} from "@/utils/type";


export const publicURL = process.env.NEXT_PUBLIC_URL;
export const headers: HeadersInit = {
    'Content-Type': 'application/json'
};


export const handleResponse = async (res: Response) => {
    if (res.ok) return res.json();

    const data: ResponseBody<null> = await res.json();
    const errorInstruction = res.headers.get("X-Error-Instruction");

    if (!errorInstruction || errorInstruction === "NONE") {
        throw new Error(data.message);
    }

    if (errorInstruction === "REDIRECT") {
        const errorRoute = `/error/${res.status}?error=${data.message}`;
        window.location.assign(errorRoute);
    }else if(errorInstruction === "MESSAGE"){
        return data;
    }

}


export async function request(method: HTTP_METHOD, url: string, data?: Record<string, unknown>) {
    const requestInit: RequestInit = {
        headers, method
    }
    if (method !== 'GET' && data) requestInit.body = JSONReplaceBigInt(data);

    const res = await fetch(`${publicURL}${url}`, requestInit);
    return await handleResponse(res);
}

export async function requestWithAuth(method: HTTP_METHOD, url: string, data?: Record<string, unknown>) {
    const requestInit: RequestInit = {
        headers, method
    }
    if (method !== 'GET' && data) requestInit.body = JSONReplaceBigInt(data);

    const res = await fetch(`${publicURL}${url}`, requestInit);
    return await handleResponse(res);
    //
    // try {
    //     const res = await fetch(`${publicURL}${url}`, requestInit);
    //     return await handleResponse(res);
    // } catch (e: unknown) {
    //     handleError(e as Error);
    // }
}


