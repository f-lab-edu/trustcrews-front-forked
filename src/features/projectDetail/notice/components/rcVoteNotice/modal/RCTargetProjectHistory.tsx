import { useState } from 'react';
import Button from '@/shared/ui/Button';
import CommonPagination from '@/shared/ui/CommonPagination';
import { useProjectHistory } from '@/features/projectHistory/api/getProjectHistory';
import { ITEM_COUNT_PER_PAGE, PAGE_RANGE } from '@/constants/pagination';
import ProjectHistoryItem from '@/features/projectHistory/components/ProjectHistoryItem';

type RCTargetProjectHistoryProps = {
  applicantUserId: bigint;
};

const RCTargetProjectHistory = ({
  applicantUserId,
}: RCTargetProjectHistoryProps) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: {
      data: { content: histories, totalPages: totalItemsCount },
    },
  } = useProjectHistory(applicantUserId, pageNumber);

  if (totalItemsCount === 0)
    return (
      <div className='w-full bg-ground100 text-center rounded-md mb-10 mobile:mb-4'>
        <p className='py-10 text-2xl font-medium text-grey900'>
          이력이 존재하지 않습니다.
        </p>
      </div>
    );

  return (
    <div className='my-8 flex flex-col items-center space-y-10'>
      <Button
        theme='black'
        tabIndex={0}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        프로젝트 이력 보기
      </Button>
      {isOpen && (
        <div className='flow-root mx-2'>
          {
            <>
              <ul role='list' className='-mb-8 overflow-auto'>
                {histories.map((history, idx) => (
                  <li
                    key={history.userProjectHistoryId}
                    className='relative pb-8'
                  >
                    <ProjectHistoryItem
                      history={history}
                      isLast={idx === histories.length - 1}
                    />
                  </li>
                ))}
              </ul>
              <CommonPagination
                activePage={pageNumber + 1}
                itemsCountPerPage={ITEM_COUNT_PER_PAGE.LIST_SM}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={PAGE_RANGE.DEFAULT}
                onChange={(page) => setPageNumber(page - 1)}
              />
            </>
          }
        </div>
      )}
    </div>
  );
};

export default RCTargetProjectHistory;
