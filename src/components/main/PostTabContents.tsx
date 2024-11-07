'use client';

import React from 'react';
import MyProjectPosts from "@/components/main/myProjectPost/MyProjectPosts";
import Posts from "@/components/main/posts/Posts";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {activeTabState, PostTabs} from '@/store/post/PostStateStore';
import ParticipateNoticeModal from "@/components/main/myProjectPost/ParticipateNotice/ParticipateNoticeModal";
import Button from "@/components/ui/Button";
import {userNoticeModalStateStore} from "@/store/UserNoticeModalStateStore";

function PostTabContents() {
    const activePostTab = useRecoilValue(activeTabState);
    const setUserNoticeModal = useSetRecoilState(userNoticeModalStateStore);

    return (
        <section>
            <div
                role='tabpanel'
                tabIndex={0}
                aria-labelledby={`${PostTabs.myProjects.name}-tab`}
                id={`${PostTabs.myProjects.name}-panel`}
                className={activePostTab.name === PostTabs.myProjects.name ? 'block' : 'hidden'}>
                <Button
                    className='mt-10'
                    type='button'
                    onClickHandler={() => setUserNoticeModal({isOpen: true})}
                >
                    프로젝트 지원 현황
                </Button>
                <MyProjectPosts isActive={activePostTab.name === PostTabs.myProjects.name}/>
                <ParticipateNoticeModal/>
            </div>
            <div
                id={`${PostTabs.recruits.name}-panel`}
                role='tabpanel'
                tabIndex={0}
                aria-labelledby={`${PostTabs.recruits.name}-tab`}
                className={activePostTab.name === PostTabs.recruits.name ? 'block' : 'hidden'}>
                <Posts/>
            </div>
        </section>
    );
}

export default PostTabContents;