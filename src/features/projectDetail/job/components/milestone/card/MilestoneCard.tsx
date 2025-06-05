'use client';

import { MouseEvent } from 'react';
import MilestoneCardMenu from '@/features/projectDetail/job/components/milestone/card/MilestoneCardMenu';
import { useRecoilState } from 'recoil';
import { activeMilestoneStateStore } from '@/store/projectDetail/job/milestone/ActiveMilestoneStateStore';
import { MilestoneInfo } from '@/types/data/projectDetail/job/milestone';
import { clsx } from 'clsx';
import { bigIntToString, numStrToBigInt } from '@/shared/utils/stringUtils';

const milestoneCardClass = (isActive: boolean) =>
  clsx(
    'cursor-pointer relative flex pc:max-w-[300px] tablet:max-w-[180px] py-4 items-center justify-between truncate rounded-md border border-gray-200 bg-white overflow-visible',
    isActive ? 'ring-2 ring-primary' : 'shadow-md',
  );

const milestoneCardTextClass = (isActive: boolean) =>
  clsx(
    'mb-2 flex flex-wrap items-center space-x-2 pc:text-xl tablet:text-lg hover:text-secondary',
    isActive ? 'text-secondary' : 'text-gray-900',
  );

type MilestoneCardProps = {
  milestoneInfo: MilestoneInfo;
};

const MilestoneCard = ({ milestoneInfo }: MilestoneCardProps) => {
  const [{ milestoneId: activeMilestoneId }, setActiveMilestone] =
    useRecoilState(activeMilestoneStateStore);

  const { milestoneId, content, startDate, endDate } = milestoneInfo;

  const handleClickMilestoneCard = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).dataset.role === 'milestone-menu') return;
    setActiveMilestone({
      ...milestoneInfo,
      milestoneId: bigIntToString(milestoneId),
    });
  };

  const isActive = numStrToBigInt(activeMilestoneId) === milestoneId;

  return (
    <div
      className={milestoneCardClass(isActive)}
      onClick={handleClickMilestoneCard}
    >
      <div className='flex-1 truncate px-4 text-sm'>
        <div className={milestoneCardTextClass(isActive)}>
          <span className='max-w-[150px] truncate'>{content}</span>
        </div>
        <div className='flex flex-wrap items-center justify-between space-x-1 pc:text-lg tablet:text-md text-gray-500'>
          <span>{startDate} &#126;</span>
          <span>{endDate}</span>
        </div>
      </div>
      <MilestoneCardMenu milestoneInfo={milestoneInfo} />
    </div>
  );
};

export default MilestoneCard;
