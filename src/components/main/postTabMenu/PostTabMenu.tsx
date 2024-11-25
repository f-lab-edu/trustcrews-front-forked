'use client';
import React from "react";
import {useRecoilState} from "recoil";
import {hasCookie} from "cookies-next";
import {activeTabState, PostTabs} from "@/store/post/PostStateStore";
import useClientMount from "@/hooks/common/useClientMount";


const PostTabMenu = () => {
    const [activePostTab, setActivePostTab] = useRecoilState(activeTabState);
    const mounted = useClientMount();

    const selectedClass = "border-b-2 border-black100 text-black100";
    const unselectedClass = "text-greyUnselect";

    return (

        <div role='tablist' aria-label='게시판' className="flex border-b">
            {
                mounted && hasCookie("user_id")
                    ? Object.values(PostTabs).map((tab) => (
                        <button
                            key={tab.name}
                            role='tab'
                            aria-selected={activePostTab.name === tab.name}
                            aria-controls={`${tab.name}-panel`}
                            id={`${tab.name}-tab`}
                            tabIndex={activePostTab.name === tab.name ? 0 : -1}
                            className={`p-5 font-bold text-2xl cursor-pointer mobile:text-xl ${activePostTab.name === tab.name
                                ? selectedClass
                                : unselectedClass
                            }`}
                            onClick={() => setActivePostTab(tab)}
                        >
                            {tab.label}
                        </button>
                    ))
                    : (
                        <button
                            role='tab'
                            aria-selected={true}
                            aria-controls={`${PostTabs.recruits.name}-panel`}
                            id={`${PostTabs.recruits.name}-tab`}
                            tabIndex={0}
                            className={`p-5 font-bold text-2xl cursor-pointer mobile:text-xl ${selectedClass}`}
                            onClick={() => setActivePostTab(PostTabs.recruits)}
                        >
                            {PostTabs.recruits.label}
                        </button>
                    )
            }
        </div>
    );
};

export default PostTabMenu;
