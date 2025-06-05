'use client';

import MilestoneAddButton from '@/features/projectDetail/job/components/milestone/MilestoneAddButton';
import Milestones from '@/features/projectDetail/job/components/milestone/Milestones';
import { useMilestones } from '@/features/projectDetail/job/api/milestone/getMilestones';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { projectIdState } from '@/store/projectDetail/ProjectIdStateStore';
import TaskAddButton from '@/features/projectDetail/job/components/task/TaskAddButton';
import Tasks from '@/features/projectDetail/job/components/task/Tasks';
import { useEffect } from 'react';
import {
  activeMilestoneStateStore,
  DEFAULT_ACTIVE_MILESTONE,
} from '@/store/projectDetail/job/milestone/ActiveMilestoneStateStore';
import ProjectJobSkeleton from '@/features/projectDetail/job/components/ProjectJobSkeleton';
import MilestoneModModal from '@/features/projectDetail/job/components/milestone/modal/MilestoneModModal';
import MilestoneAddModal from '@/features/projectDetail/job/components/milestone/modal/MilestoneAddModal';
import TaskAddModal from '@/features/projectDetail/job/components/task/modal/TaskAddModal';
import TaskModModal from '@/features/projectDetail/job/components/task/modal/TaskModModal';
import TasksSkeleton from '@/features/projectDetail/job/components/task/TasksSkeleton';
import { bigIntToString } from '@/shared/utils/stringUtils';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';

const { milestoneId: DEFAULT_MILESTONE_ID } = DEFAULT_ACTIVE_MILESTONE;

const ProjectJob = () => {
  const [{ milestoneId: activeMilestoneId }, setActiveMilestone] =
    useRecoilState(activeMilestoneStateStore);
  const resetActiveMilestone = useResetRecoilState(activeMilestoneStateStore);
  const projectId = useRecoilValue(projectIdState);
  const {
    data: { data },
  } = useMilestones(projectId);

  const initActiveMilestone = data[0];

  useEffect(() => {
    if (initActiveMilestone) {
      setActiveMilestone({
        milestoneId: bigIntToString(initActiveMilestone.milestoneId),
        index: initActiveMilestone.index,
        startDate: initActiveMilestone.startDate,
        endDate: initActiveMilestone.endDate,
      });
    }

    return () => {
      resetActiveMilestone();
    };
  }, [initActiveMilestone, setActiveMilestone, resetActiveMilestone]);

  if (initActiveMilestone && activeMilestoneId === DEFAULT_MILESTONE_ID)
    return <ProjectJobSkeleton />;

  return (
    <section className='w-full tablet:px-2 flex flex-col justify-between space-y-[6rem]'>
      <section className='w-full flex flex-col items-start'>
        <MilestoneAddButton />
        <Milestones data={data} totalCounts={data.length} />
        <section className='w-full mt-12 flex flex-col items-start'>
          <div className='w-full flex mobile:flex-col mobile:items-start items-center justify-start mobile:space-y-4 tablet:mb-4'>
            <TaskAddButton />
            {initActiveMilestone && (
              <div className='flex-wrap flex mobile:flex-col items-center mobile:items-start tablet:ml-4 mr-auto space-x-3 mobile:space-x-0'>
                <h3 className='max-w-[300px] my-1 tablet:text-3xl mobile:text-lg font-medium text-greyDarkBlue truncate'>
                  {initActiveMilestone.content}
                </h3>
                <div className='flex-wrap flex items-center space-x-2 tablet:text-xl mobile:text-base text-grey800'>
                  <span>{initActiveMilestone.startDate}</span>
                  <span>&#126;</span>
                  <span>{initActiveMilestone.endDate}</span>
                </div>
              </div>
            )}
          </div>
          <FieldQueryBoundary
            errorFallbackSize='md'
            suspenseFallback={<TasksSkeleton />}
          >
            <Tasks />
          </FieldQueryBoundary>
        </section>
      </section>
      <MilestoneModModal />
      <MilestoneAddModal />
      <TaskAddModal />
      <TaskModModal />
    </section>
  );
};

export default ProjectJob;
