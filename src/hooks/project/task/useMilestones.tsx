'use client';

import {useQuery} from "@tanstack/react-query";
import {MilestoneInfo, ResponseBody} from "@/utils/type";
import {getProjectMilestones} from "@/service/project/milestone";
import React from "react";


export const useMilestones = (projectId: string) => {
    const {
        data,
        isFetching
    } = useQuery<ResponseBody<MilestoneInfo[]>, Error, ResponseBody<MilestoneInfo[]>>({
        queryKey: ['milestoneList', projectId],
        queryFn: () => getProjectMilestones(projectId),
        staleTime: 0,
        // // retry: false
    });

    const milestoneList = data?.data || [];

    if (isFetching) return {
        isMilestoneFetching: isFetching,
        milestoneList: [],
        activeMilestone: null,
        activeMilestoneId: null,
        activeMilestoneIndex: null,
    };

    const activeMilestone =  milestoneList[0];
    const activeMilestoneId = activeMilestone ? activeMilestone.milestoneId : null;
    const activeMilestoneIndex = activeMilestone ? activeMilestone.index! : null;

    return {
        isMilestoneFetching: isFetching,
        milestoneList,
        activeMilestone,
        activeMilestoneId,
        activeMilestoneIndex,
    };
}


