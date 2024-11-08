import React from 'react';
import {dehydrate, QueryClient} from "@tanstack/react-query";
import {getPostList, SearchPostParams} from "@/service/post/post";
import {HydrationBoundary} from "@tanstack/react-query";

const prefetchingPostParams: SearchPostParams = {techStacks: [], position: '0', keyword: '', page: 0};

async function InitialPostsDataProvider({children}: { children: React.ReactNode }) {
    const queryClient = new QueryClient();

    const {techStacks, position, keyword, page} = prefetchingPostParams;
    await queryClient.prefetchQuery({
        queryKey: ['postList', techStacks, position, keyword, page],
        queryFn: () => getPostList(prefetchingPostParams),
        staleTime: 60 * 1000
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    );
}

export default InitialPostsDataProvider;