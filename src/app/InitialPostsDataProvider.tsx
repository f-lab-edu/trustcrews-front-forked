import React from 'react';
import {dehydrate, QueryClient} from "@tanstack/react-query";
import {getPostList} from "@/service/post/post";
import {HydrationBoundary} from "@tanstack/react-query";

async function InitialPostsDataProvider({children}: { children: React.ReactNode }) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['postList'],
        queryFn: () => getPostList({
            techStacks: [],
            position: '0',
            keyword: '',
            page: 0
        }),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    );
}

export default InitialPostsDataProvider;