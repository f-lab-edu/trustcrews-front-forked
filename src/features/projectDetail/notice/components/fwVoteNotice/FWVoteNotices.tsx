import { useState } from 'react';
import CommonPagination from '@/shared/ui/CommonPagination';
import NoContentsMessage from '@/shared/ui/NoContentsMessage';
import { useFWVoteNoticeList } from '@/features/projectDetail/notice/api/fwVoteNotice/getFWVoteNoticeList';
import { useRecoilValue } from 'recoil';
import { projectIdState } from '@/store/projectDetail/ProjectIdStateStore';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { ITEM_COUNT_PER_PAGE, PAGE_RANGE } from '@/constants/pagination';
import FWVoteNoticeItem from '@/features/projectDetail/notice/components/fwVoteNotice/FWVoteNoticeItem';

const FWVoteNotices = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const projectId = useRecoilValue(projectIdState);
  const {
    data: {
      data: { content: alertList, totalPages: totalItemsCount },
    },
  } = useFWVoteNoticeList(numStrToBigInt(projectId), pageIndex);

  return (
    <>
      <div className='alertList'>
        {totalItemsCount > 0 ? (
          <ul role='list'>
            {alertList.map((item) => (
              <FWVoteNoticeItem key={item.noticeId} data={item} />
            ))}
          </ul>
        ) : (
          <NoContentsMessage />
        )}
      </div>
      <CommonPagination
        activePage={pageIndex + 1}
        itemsCountPerPage={ITEM_COUNT_PER_PAGE.LIST_SM}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={PAGE_RANGE.DEFAULT}
        onChange={(pageIndex: number) => setPageIndex(pageIndex - 1)}
      />
    </>
  );
};

export default FWVoteNotices;
