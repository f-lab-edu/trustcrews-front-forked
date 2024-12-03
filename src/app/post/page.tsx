import React from "react";
import PostDetail from "@/components/postDetail/PostDetail";
import ConfirmModal from "@/components/ui/ConfirmModal";
import {Metadata} from "next";
import {numStrToBigInt} from "@/utils/common";
import {getPost} from "@/service/post/post";
import {PostInfo, ResponseBody} from "@/utils/type";


export async function generateMetadata({
                                           searchParams: {
                                               postId
                                           }
                                       }: { searchParams: { postId: string } }): Promise<Metadata> {
    const postInfo: ResponseBody<PostInfo> = await getPost(numStrToBigInt(postId));

    return {
        title: `${postInfo.data!.title} - 팀프로젝트 | TRUSTCREWS`,
        description: `${postInfo.data!.content}`
    }
}

const PostDetailPage = ({
                            searchParams: {
                                postId,
                                projectId
                            }
                        }: { searchParams: { postId: string, projectId: string } }) => {
    return (
        <>
            <PostDetail postId={postId} projectId={projectId}/>
            <ConfirmModal/>
        </>
    );
};

export default PostDetailPage;
