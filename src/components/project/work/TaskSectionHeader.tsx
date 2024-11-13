'use client';
import React from 'react';
import TaskAddButton from "@/components/project/work/work/TaskAddButton";
import {MilestoneInfo} from "@/utils/type";


export default function TaskSectionHeader({milestoneInfo}:{milestoneInfo:MilestoneInfo}) {
    const {milestoneId, content, projectId, startDate, endDate} = milestoneInfo;

    return (
        <div
            className='w-full flex mobile:flex-col mobile:items-start items-center justify-start mobile:space-y-4 tablet:mb-4'>
            <TaskAddButton milestoneId={milestoneId} projectId={projectId}/>
            <div className='flex-wrap flex mobile:flex-col items-center mobile:items-start tablet:ml-4 mr-auto space-x-3 mobile:space-x-0'>
                <h3 className='max-w-[300px] my-1 tablet:text-3xl mobile:text-lg font-medium text-greyDarkBlue truncate'>
                    {content}
                </h3>
                <div className='flex-wrap flex items-center space-x-2 tablet:text-xl mobile:text-base text-grey800'>
                    <span>{startDate}</span>
                    <span>&#126;</span>
                    <span>{endDate}</span>
                </div>
            </div>
        </div>
    );
}