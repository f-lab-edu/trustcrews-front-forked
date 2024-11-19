'use client';
import React, {ReactNode, useState} from 'react';
import {RecoilRoot} from 'recoil';
import {isServer, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {ReactQueryStreamedHydration} from "@tanstack/react-query-next-experimental";

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000 * 5,
                refetchOnWindowFocus:false
            },
        },
    })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
    if (isServer) {
        return makeQueryClient()
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient()
        return browserQueryClient
    }
}

function Providers({children}: { children: ReactNode}) {
    const queryClient = getQueryClient()

    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                    {children}
                <ReactQueryDevtools/>
            </QueryClientProvider>
        </RecoilRoot>
    );
}

export default Providers;