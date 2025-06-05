import NoticeNavTab from '@/features/projectDetail/notice/components/NoticeNavTab';
import RCVoteNotice from '@/features/projectDetail/notice/components/rcVoteNotice/RCVoteNotices';
import FWVoteNotices from '@/features/projectDetail/notice/components/fwVoteNotice/FWVoteNotices';
import CrewNotices from '@/features/projectDetail/notice/components/crewNotice/CrewNotices';
import FWVoteNoticeModal from '@/features/projectDetail/notice/components/fwVoteNotice/modal/FWVoteNoticeModal';
import RCVoteNoticeModal from '@/features/projectDetail/notice/components/rcVoteNotice/modal/RCVoteNoticeModal';
import { useRecoilValue } from 'recoil';
import { activeNoticeTabStateStore } from '@/store/projectDetail/notice/ActiveNoticeTabStateStore';
import { NOTICE_TABS } from '@/constants/data/projectDetail/notice/noticeTabs';
import ContentsLoader from '@/shared/ui/ContentsLoader';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';
import { ApplicationError } from '@/shared/utils/ApplicationError';

const {
  NTAB001: { code: RCVOTE_NOTICE_TAB },
  NTAB002: { code: FWVOTE_NOTICE_TAB },
  NTAB003: { code: CREW_NOTICE_TAB },
} = NOTICE_TABS;

export const ProjectNotice = () => {
  const { code: activeNoticeTab } = useRecoilValue(activeNoticeTabStateStore);

  let contents = null;
  switch (activeNoticeTab) {
    case RCVOTE_NOTICE_TAB:
      contents = <RCVoteNotice />;
      break;
    case FWVOTE_NOTICE_TAB:
      contents = <FWVoteNotices />;
      break;
    case CREW_NOTICE_TAB:
      contents = <CrewNotices />;
      break;
    default:
      throw new ApplicationError(`Unknown Notice Tab: ${activeNoticeTab}`);
  }

  return (
    <section className='tablet:flex tablet:space-x-16 pc:space-x-24 pc:max-w-[1000px] tablet:max-w-[700px] mx-3'>
      <NoticeNavTab />
      <section className='mb-20 tablet:basis-4/5'>
        <FieldQueryBoundary
          errorFallbackSize='md'
          suspenseFallback={<ContentsLoader />}
        >
          {contents}
        </FieldQueryBoundary>
        <FWVoteNoticeModal />
        <RCVoteNoticeModal />
      </section>
    </section>
  );
};
