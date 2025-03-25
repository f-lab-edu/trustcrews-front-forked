declare module "return-fetch" {
    export type FetchArgs = [string | URL, RequestInit];

    export type ReturnFetch = typeof returnFetch;

    export interface ReturnFetchDefaultOptions {
        fetch?: ReturnType<ReturnFetch>;
        baseUrl?: string | URL;
        headers?: HeadersInit;
        interceptors?: {
            request?: (
                requestArgs: FetchArgs
            ) => Promise<FetchArgs>;
            response?: (
                response: Response,
                requestArgs: FetchArgs
            ) => Promise<Response>;
        };
    }

    const returnFetch: (defaultOptions?: ReturnFetchDefaultOptions) => (input: URL | RequestInfo, init: RequestInit) => Promise<Response>;
    export default returnFetch;
}