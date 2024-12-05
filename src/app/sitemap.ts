import {MetadataRoute} from "next";
import {getPostList} from "@/service/post/post";
import {DEFAULT_SEARCH_POST_PARAM} from "@/app/InitialPostsDataProvider";
import {PageResponseBody, PostCardInfo} from "@/utils/type";

const DOMAIN = process.env.NEXT_PUBLIC_URL;
export default async function sitemap():Promise<MetadataRoute.Sitemap> {
    //     const {techStacks, position, keyword, page} = DEFAULT_SEARCH_POST_PARAM;
    // PageResponseBody<PostCardInfo[]>
    //     await queryClient.prefetchQuery({
    //         queryKey: ['postList', techStacks, position, keyword, page],
    //         queryFn: () => getPostList(DEFAULT_SEARCH_POST_PARAM),
    //     });

    try{
        const res:PageResponseBody<PostCardInfo[]> = await getPostList(DEFAULT_SEARCH_POST_PARAM);
        return res.data.content.map((post) => ({
            url:`${DOMAIN}/post?postId=${post.boardId}&amp;projectId=${post.project.projectId}`,
            lastModified: new Date(post.updateDate),
            priority: 0.8
        }));
    }catch (e:unknown){
        console.error(e as Error);
        throw e as Error;
    }



}