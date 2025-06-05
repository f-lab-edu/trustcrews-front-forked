'use client';

import { useState } from 'react';
import CommonPagination from '@/shared/ui/CommonPagination';
import { ITEM_COUNT_PER_PAGE, PAGE_RANGE } from '@/constants/pagination';
import { useMyProjectHistory } from '@/features/userProfile/api/getMyProjectHistory';
import ProjectHistoryItem from '@/features/projectHistory/components/ProjectHistoryItem';

const UserProjectHistory = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const {
    data: {
      data: { content, totalPages },
    },
  } = useMyProjectHistory(pageNumber);

  return (
    <div className='p-3 mobile:p-0 mobile:pt-3 space-y-5'>
      <h3 className='tablet:text-[26px] mobile:text-lg font-semibold text-greyDarkBlue my-10 mobile:my-5'>
        프로젝트 이력
      </h3>
      <div className='flow-root mx-2'>
        {totalPages > 0 ? (
          <>
            <ul role='list' className='-mb-8'>
              {content.map((history, idx) => (
                <li
                  key={history.userProjectHistoryId}
                  className='relative pb-8'
                >
                  <ProjectHistoryItem
                    history={history}
                    isLast={idx === content.length - 1}
                  />
                </li>
              ))}
            </ul>
            <CommonPagination
              activePage={pageNumber + 1}
              itemsCountPerPage={ITEM_COUNT_PER_PAGE.LIST_SM}
              totalItemsCount={totalPages}
              pageRangeDisplayed={PAGE_RANGE.DEFAULT}
              onChange={(page) => setPageNumber(page - 1)}
            />
          </>
        ) : (
          <div className='w-full bg-ground100 text-center rounded-md mb-10 mobile:mb-4'>
            <p className='py-10 text-2xl font-medium text-grey900'>
              이력이 존재하지 않습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProjectHistory;
