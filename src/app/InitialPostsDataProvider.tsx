import React from 'react';
import {dehydrate, QueryClient} from "@tanstack/react-query";
import {getPostList, SearchPostParams} from "@/service/post/post";
import {HydrationBoundary} from "@tanstack/react-query";

export const DEFAULT_SEARCH_POST_PARAM: SearchPostParams = {
    techStacks: [],
    position: '0',
    keyword: '',
    page: 0
} as const;

async function InitialPostsDataProvider({children}: { children: React.ReactNode }) {
    const queryClient = new QueryClient();

    const {techStacks, position, keyword, page} = DEFAULT_SEARCH_POST_PARAM;
    await queryClient.prefetchQuery({
        queryKey: ['postList', techStacks, position, keyword, page],
        queryFn: () => getPostList(DEFAULT_SEARCH_POST_PARAM),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    );
}

export default InitialPostsDataProvider;