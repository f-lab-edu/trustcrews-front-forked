import { useState } from 'react';
import CommonPagination from '@/shared/ui/CommonPagination';
import NoContentsMessage from '@/shared/ui/NoContentsMessage';
import { useCrewNoticeList } from '@/features/projectDetail/notice/api/crewNotice/getCrewNoticeList';
import { useRecoilValue } from 'recoil';
import { projectIdState } from '@/store/projectDetail/ProjectIdStateStore';
import NoticeBadge from '@/features/projectDetail/notice/components/NoticeBadge';
import { NOTICE_TYPES } from '@/constants/data/projectDetail/notice/noticeTypes';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { ITEM_COUNT_PER_PAGE, PAGE_RANGE } from '@/constants/pagination';

const CrewNotices = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const projectId = useRecoilValue(projectIdState);

  const {
    data: {
      data: { content: noticeList, totalPages: totalItemsCount },
    },
  } = useCrewNoticeList(numStrToBigInt(projectId), pageIndex);

  return (
    <>
      <div className='alertList'>
        {totalItemsCount > 0 ? (
          <ul role='list'>
            {noticeList.map(({ noticeId, contents, createDate }) => (
              <li
                key={`crewNotice-${noticeId}`}
                className='flex items-center gap-x-10 px-3 py-5 pc:text-lg mobile:text-sm text-grey900'
              >
                <div className='flex items-center gap-x-4'>
                  <NoticeBadge noticeType={NOTICE_TYPES.PRA2001.code}>
                    {NOTICE_TYPES.PRA2001.name}
                  </NoticeBadge>
                  {contents}
                </div>
                <div className='ml-auto text-grey600'>{createDate}</div>
              </li>
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

export default CrewNotices;
