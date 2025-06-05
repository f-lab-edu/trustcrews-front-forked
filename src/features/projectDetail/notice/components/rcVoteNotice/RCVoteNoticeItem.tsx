import NoticeBadge from '@/features/projectDetail/notice/components/NoticeBadge';
import VoteStatusBadge from '@/features/projectDetail/vote/components/VoteStatusBadge';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { NOTICE_TYPES } from '@/constants/data/projectDetail/notice/noticeTypes';
import { rcVoteNoticeModalState } from '@/store/projectDetail/notice/rcVoteNotice/RCVoteNoticeModalStateStore';
import { projectManageAuthStateStore } from '@/store/projectDetail/config/pmAuth/ProjectManageAuthStateStore';
import { RCVoteNoticeData } from '@/features/projectDetail/notice/api/rcVoteNotice/getRCVoteNoticeList';
import { bigIntToString } from '@/shared/utils/stringUtils';

const {
  PRA1002: { code: RecruitNoticeCode, name: RecruitNoticeName },
} = NOTICE_TYPES;

type RCVoteNoticeListItemProps = {
  data: RCVoteNoticeData;
};

const RCVoteNoticeItem = ({ data }: RCVoteNoticeListItemProps) => {
  const setVAlertRecruitModalState = useSetRecoilState(rcVoteNoticeModalState);
  const { code: userPMAuth } = useRecoilValue(projectManageAuthStateStore);

  const {
    noticeId,
    voteId,
    applyId,
    contents,
    createDate,
    voteStatus: { code: voteStatusCode, name: voteStatusName },
  } = data;

  const handleClickNoticeItem = () => {
    setVAlertRecruitModalState({
      isOpen: true,
      title: contents,
      voteId: bigIntToString(voteId),
      noticeId: bigIntToString(noticeId),
      applyId: bigIntToString(applyId),
      userPMAuth,
    });
  };

  return (
    <li
      key={`recruitNotice-${noticeId}`}
      className='flex items-center gap-x-10 px-3 py-5 pc:text-lg mobile:text-sm text-grey900 cursor-pointer'
      onClick={handleClickNoticeItem}
    >
      <div className='flex items-center gap-x-4'>
        <NoticeBadge noticeType={RecruitNoticeCode}>
          {RecruitNoticeName}
        </NoticeBadge>
        <VoteStatusBadge voteStatus={voteStatusCode}>
          {voteStatusName}
        </VoteStatusBadge>
        {contents}
      </div>
      <div className='ml-auto text-grey600'>{createDate}</div>
    </li>
  );
};

export default RCVoteNoticeItem;
