'use client';

import CommonPagination from '@/shared/ui/CommonPagination';
import useTasks from '@/features/projectDetail/job/api/task/getTaskList';
import TaskCard from '@/features/projectDetail/job/components/task/card/TaskCard';
import { useRecoilValue } from 'recoil';
import { projectIdState } from '@/store/projectDetail/ProjectIdStateStore';
import { activeMilestoneStateStore } from '@/store/projectDetail/job/milestone/ActiveMilestoneStateStore';
import { useState } from 'react';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { ITEM_COUNT_PER_PAGE } from '@/constants/pagination';

const Tasks = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const projectId = useRecoilValue(projectIdState);
  const { milestoneId } = useRecoilValue(activeMilestoneStateStore);
  const {
    data: {
      data: { content: taskList, totalPages },
    },
  } = useTasks({
    projectId: numStrToBigInt(projectId),
    milestoneId: numStrToBigInt(milestoneId),
    pageNumber,
  });

  const handleChangePage = (pageNumber: number) => {
    setPageNumber(pageNumber - 1);
  };

  return (
    <div className='w-full mt-4 flex flex-col items-center'>
      {taskList.length > 0 ? (
        <ul className='w-full grid pc:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 grid-rows-2 mobile:grid-rows-1 place-items-center gap-4 tablet:gap-8'>
          {taskList.map((v) => (
            <li key={v.taskId}>
              <TaskCard item={v} />
            </li>
          ))}
        </ul>
      ) : (
        <div className='w-full h-[14rem] flex items-center justify-center bg-ground200 rounded-lg'>
          <span className='tablet:text-3xl text-grey800 font-semibold'>
            업무를 추가해 주세요
          </span>
        </div>
      )}
      <CommonPagination
        activePage={pageNumber + 1}
        totalItemsCount={totalPages}
        pageRangeDisplayed={5}
        itemsCountPerPage={ITEM_COUNT_PER_PAGE.CARDS_SM}
        onChange={handleChangePage}
      />
    </div>
  );
};

export default Tasks;
