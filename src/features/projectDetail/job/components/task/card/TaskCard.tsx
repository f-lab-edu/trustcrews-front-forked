'use client';

import { useMediaQuery } from 'react-responsive';
import TaskCardMenu from '@/features/projectDetail/job/components/task/card/TaskCardMenu';
import { TaskItem } from '@/features/projectDetail/job/api/task/getTaskList';
import TaskStatusBadge from '@/features/projectDetail/job/components/task/TaskStatusBadge';

type TaskCardProps = {
  item: TaskItem;
};

const TaskCard = ({ item }: TaskCardProps) => {
  const {
    startDate,
    endDate,
    summary,
    todo,
    progressStatus,
    lastModifiedMemberNickname,
    assignedUser,
  } = item;

  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  const contentDetailArr = todo.split('&');

  return isDesktop ? (
    <div className='max-w-[340px] my-5 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-lg'>
      <div className='w-full flex items-center px-4 py-3 mobile:px-6 bg-ground100'>
        <div className='pc:text-[1.3rem] font-semibold text-greyDarkBlue max-w-[150px] truncate'>
          {summary}
        </div>
        <div className='ml-auto self-border border-black'>
          <TaskCardMenu taskItem={item} />
        </div>
      </div>
      <div className='w-[330px] flex flex-col space-y-5 px-4 py-5 mobile:p-6'>
        <div className='flex items-center'>
          <div className='basis-[100px] font-semibold pc:text-lg text-greyBlue'>
            기간
          </div>
          <div className='flex-1 text-greyBlue '>
            {startDate} ~ {endDate}
          </div>
        </div>
        <div className='flex items-center'>
          <div className='basis-[100px] font-semibold pc:text-lg text-greyBlue'>
            진행 상태
          </div>
          <div className='flex-1'>
            <TaskStatusBadge taskStatus={progressStatus.code}>
              {progressStatus.name}
            </TaskStatusBadge>
          </div>
        </div>
        <div className='flex items-center'>
          <div className='basis-[100px] font-semibold pc:text-lg text-greyBlue'>
            담당
          </div>
          <div className='flex-1 flex items-center space-x-3'>
            <span className='text-greyBlue'>{assignedUser.nickname}</span>
          </div>
        </div>
        <div className='flex items-center'>
          <div className='basis-[100px] font-semibold pc:text-lg text-greyBlue'>
            할 일
          </div>
          <div className='flex-1 flex items-center space-x-3'>
            <span className='w-[120px] text-greyBlue/90 font-semibold truncate'>
              {contentDetailArr[0]}
            </span>
            {contentDetailArr.length > 1 && (
              <span className='text-gray-600'>
                외 {contentDetailArr.length - 1}개
              </span>
            )}
          </div>
        </div>
      </div>
      <div className='px-4 py-3 mobile:px-6 fl flex items-center space-x-2 text-sm text-gray-500'>
        <span>업데이트 :</span>
        <span>{lastModifiedMemberNickname}</span>
      </div>
    </div>
  ) : (
    <div className='relative w-[340px] flex flex-col px-3 py-5 mobile:flex-nowrap border border-gray-200 rounded-lg shadow-md text-sm text-greyBlue'>
      <div className='flex items-center justify-start space-x-3 '>
        <span className='text-base font-semibold leading-6 max-w-[150px] truncate'>
          {summary}
        </span>
        <div className='leading-5 font-semibold'>
          by.
          <span className='mx-1'>{assignedUser.nickname}</span>
        </div>
        <div className='flex items-center space-x-2'>
          <TaskStatusBadge taskStatus={progressStatus.code} size='xs'>
            {progressStatus.name}
          </TaskStatusBadge>
        </div>
      </div>
      <div className='text-sm my-1'>
        {startDate} ~ {endDate}
      </div>
      <div className='mt-2 flex items-center space-x-1 text-greyBlue/90'>
        <svg viewBox='0 0 2 2' className='h-0.5 w-0.5 fill-current'>
          <circle cx={1} cy={1} r={1} />
        </svg>
        <span className='w-[120px] truncate'>{contentDetailArr[0]}</span>
        {contentDetailArr.length > 1 && (
          <span className='text-gray-600'>
            외 {contentDetailArr.length - 1}개
          </span>
        )}
      </div>
      <div className='absolute right-3 self-border border-black'>
        <TaskCardMenu taskItem={item} />
      </div>
    </div>
  );
};

export default TaskCard;
