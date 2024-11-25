'use client';

import React from 'react';
import MilestoneCard from "@/components/project/work/milestone/MilestoneCard";
import CustomSwiper from "@/components/ui/CustomSwiper";
import {useMilestones} from "@/hooks/project/task/useMilestones";
import {MilestoneListSkeleton} from "@/components/ui/skeleton/project/task";
import useCurrentUserPMAuth from "@/hooks/project/useCurrentUserPMAuth";


function Milestones({projectId}: { projectId: string }) {
    const {currentUserPMAuth, isFetchingCurrentUserPMAuth} = useCurrentUserPMAuth(projectId);
    const {
        milestoneList,
        activeMilestoneIndex: initActiveMilestoneIndex,
        activeMilestoneId: initActiveMilestoneId,
        isMilestoneFetching,
    } = useMilestones(projectId);


    if (isMilestoneFetching || isFetchingCurrentUserPMAuth) return <MilestoneListSkeleton/>;

    return milestoneList!.length < 1
        ? (
            <div className='w-full h-[12rem] flex items-center justify-center bg-ground200 rounded-lg'>
                <span className='tablet:text-3xl text-grey800 font-semibold'>마일스톤을 추가해 주세요</span>
            </div>
        )
        : (
            <CustomSwiper
                slideItems={
                    milestoneList.map((v) => (
                        {
                            key: v.milestoneId.toString(),
                            components:
                                <MilestoneCard
                                    milestoneInfo={v}
                                    initActiveMilestoneId={initActiveMilestoneId}
                                    authMap={currentUserPMAuth!}
                                />
                        }
                    ))}
                initActiveSlideIndex={initActiveMilestoneIndex!}
            />
        )

}

export default Milestones;