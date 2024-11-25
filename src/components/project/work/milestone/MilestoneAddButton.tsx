'use client';

import React from 'react';
import Button from "@/components/ui/Button";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import {
    milestoneAddDataStateSelector,
    milestoneAddModalStateStore,
    milestoneModModalStateStore
} from "@/store/project/task/MilestoneStateStore";
import {useSetRecoilState} from "recoil";
import {MilestoneAddButtonSkeleton} from "@/components/ui/skeleton/project/task";
import useCurrentUserPMAuth from "@/hooks/project/useCurrentUserPMAuth";

function MilestoneAddButton({projectId}: { projectId: string, userId: string }) {
    const {currentUserPMAuth, isFetchingCurrentUserPMAuth} = useCurrentUserPMAuth(projectId);
    const setMilestoneAddModalState = useSetRecoilState(milestoneAddModalStateStore);
    const setMilestoneAddDataProjectId = useSetRecoilState(milestoneAddDataStateSelector('projectId'));
    const setMilestoneAddDataAuthMap = useSetRecoilState(milestoneAddDataStateSelector('authMap'));

    if (isFetchingCurrentUserPMAuth) return <MilestoneAddButtonSkeleton/>;

    const onClickHandler = () => {
        setMilestoneAddModalState(prev => ({...prev, isOpen: true}));
        setMilestoneAddDataProjectId(projectId);
        setMilestoneAddDataAuthMap(currentUserPMAuth!.code);
    }

    return (
        <Button size='md' className='mb-4' onClickHandler={onClickHandler} aria-label='마일스톤 추가'>
                <span className='flex items-center'>
                  <FaPlus className='tablet:w-3 tablet:h-3 mr-2'/>
                  마일스톤 추가
                </span>
        </Button>
    );
}

export default MilestoneAddButton;