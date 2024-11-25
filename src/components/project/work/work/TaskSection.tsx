'use client';

import React, {useEffect} from 'react';
import Tasks from "@/components/project/work/work/Tasks";
import TaskSectionHeader from "@/components/project/work/TaskSectionHeader";
import {useMilestones} from "@/hooks/project/task/useMilestones";
import {TaskSectionSkeleton} from "@/components/ui/skeleton/project/task";
import {milestoneActiveStateStore} from "@/store/project/task/MilestoneStateStore";
import {useRecoilState} from "recoil";

function TaskSection({projectId}: { projectId: string }) {
    const [activeMilestone, setActiveMilestone] = useRecoilState(milestoneActiveStateStore);

    const {
        activeMilestone: initActiveMilestone,
        activeMilestoneId: initActiveMilestoneId,
        isMilestoneFetching,
        milestoneList
    } = useMilestones(projectId);

    // milestoneActiveStateStore 초기화
    useEffect(() => {
        if (initActiveMilestone && activeMilestone.activeMilestoneIndex === null) {
            setActiveMilestone({
                activeMilestone: initActiveMilestone,
                activeMilestoneId: initActiveMilestoneId,
                activeMilestoneIndex: initActiveMilestone.index!
            });
        }
    }, [initActiveMilestone, activeMilestone.activeMilestoneIndex, setActiveMilestone, initActiveMilestoneId]);

    if (isMilestoneFetching) return <TaskSectionSkeleton/>;
    if(milestoneList.length > 0 && activeMilestone.activeMilestoneIndex === null) return <TaskSectionSkeleton/>;

    return milestoneList.length > 0
        ? (
            <section className='w-full mt-12 flex flex-col items-start'>
                <TaskSectionHeader milestoneInfo={activeMilestone.activeMilestone!}/>
                <Tasks projectId={projectId} milestoneId={activeMilestone.activeMilestoneId!}/>
            </section>
        ) : null;
}

export default TaskSection;