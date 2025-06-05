'use client';

import { useState } from 'react';
import CommonPagination from '@/shared/ui/CommonPagination';
import { useCrewTaskHistory } from '@/features/projectDetail/crewDetail/crewTaskHistory/api/getCrewTaskHistory';
import { clsx } from 'clsx';
import { FaMinus } from '@react-icons/all-files/fa/FaMinus';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { useRecoilValue } from 'recoil';
import { crewIdState } from '@/store/projectDetail/crew/CrewIdStateStore';
import { ITEM_COUNT_PER_PAGE, PAGE_RANGE } from '@/constants/pagination';

const CrewTaskHistory = () => {
  const crewId = useRecoilValue(crewIdState);
  const [pageIndex, setPageIndex] = useState(0);

  const {
    data: {
      data: { content: taskHistory, totalPages },
    },
  } = useCrewTaskHistory(crewId, pageIndex);

  if (totalPages === 0)
    return (
      <div className='flex flex-col items-center justify-center w-full h-[300px] text-3xl text-gray-600/90 text-center bg-gray-200/60 rounded-md'>
        <div className='pb-2'>작업 수행 이력이 없습니다.</div>
      </div>
    );

  return (
    <>
      <div className='max-h-[280px] flow-root tablet:mt-8 mobile:mt-3 mb-8'>
        <ul role='list' className='-mb-8'>
          {taskHistory.map((event, eventIdx) => (
            <li key={`taskHistory-${event.trustScoreHistoryId}`}>
              <div className='min-w-0 ml-3 mobile:ml-1 pb-8 flex flex-1 justify-start space-x-8 mobile:space-x-1'>
                <div className='relative whitespace-nowrap font-semibold pc:text-[22px] tablet:text-lg mobile:text-base text-gray-500'>
                  {eventIdx > taskHistory.length - 1 && (
                    <span
                      className='absolute left-[50%] top-7 -ml-px h-full w-0.5 bg-gray-200'
                      aria-hidden='true'
                    />
                  )}
                  <span>{event.createDate}</span>
                </div>
                <div className='flex items-center space-x-3 mobile:space-x-1'>
                  <div className='relative flex items-stretch'>
                    <span
                      className={clsx(
                        'ml-4 mr-2 h-[24px] w-[24px] mobile:h-[20px] mobile:w-[20px] rounded-full flex items-center justify-center ring-8 ring-white',
                        {
                          'bg-primary':
                            event.pointType === 'plus' ||
                            event.pointType === 'default',
                          'bg-danger': event.pointType === 'minus',
                        },
                      )}
                    >
                      {event.pointType === 'minus' ? (
                        <FaMinus
                          className='h-4 w-4 mobile:h-3 mobile:w-3text-white bg-danger'
                          aria-hidden='true'
                        />
                      ) : (
                        <FaPlus
                          className='h-4 w-4 mobile:h-3 mobile:w-3 text-white bg-primary'
                          aria-hidden='true'
                        />
                      )}
                    </span>
                    <span
                      className={clsx(
                        'tablet:min-w-[40px] mobile:min-w-[30px] pc:text-[22px] tablet:text-xl mobile:text-base font-semibold',
                        {
                          'text-primary':
                            event.pointType === 'plus' ||
                            event.pointType === 'default',
                          'text-danger': event.pointType === 'minus',
                        },
                      )}
                    >
                      {event.point}
                    </span>
                  </div>
                  <div>
                    <p className='pc:text-[20px] tablet:text-lg mobile:text-md text-gray-500'>
                      {event.summary}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <CommonPagination
        activePage={pageIndex + 1}
        pageRangeDisplayed={PAGE_RANGE.DEFAULT}
        itemsCountPerPage={ITEM_COUNT_PER_PAGE.LIST_SM}
        totalItemsCount={totalPages}
        onChange={(pageIndex: number) => setPageIndex(pageIndex - 1)}
      />
    </>
  );
};

export default CrewTaskHistory;
