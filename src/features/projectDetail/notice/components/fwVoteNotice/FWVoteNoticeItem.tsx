import NoticeBadge from '@/features/projectDetail/notice/components/NoticeBadge';
import VoteStatusBadge from '@/features/projectDetail/vote/components/VoteStatusBadge';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { NOTICE_TYPES } from '@/constants/data/projectDetail/notice/noticeTypes';
import { fwNoticeModalState } from '@/store/projectDetail/notice/fwVoteNotice/FWVoteNoticeModalStateStore';
import { FWVoteNoticeData } from '@/features/projectDetail/notice/api/fwVoteNotice/getFWVoteNoticeList';
import { projectIdState } from '@/store/projectDetail/ProjectIdStateStore';
import { projectManageAuthStateStore } from '@/store/projectDetail/config/pmAuth/ProjectManageAuthStateStore';
import { bigIntToString } from '@/shared/utils/stringUtils';

type VAlertFwListItemProps = {
  data: FWVoteNoticeData;
};

const FWVoteNoticeItem = ({ data }: VAlertFwListItemProps) => {
  const setVAlertFWModalState = useSetRecoilState(fwNoticeModalState);
  const projectId = useRecoilValue(projectIdState);
  const { code: userPMAuth } = useRecoilValue(projectManageAuthStateStore);

  const {
    noticeId,
    contents,
    createDate,
    voteStatus,
    voteId,
    crewId,
    crewPMAuth: { code: crewPMAuth },
  } = data;

  const handleClickNoticeItem = () => {
    setVAlertFWModalState({
      isOpen: true,
      title: contents,
      projectId,
      voteId: bigIntToString(voteId),
      crewId: bigIntToString(crewId),
      userPMAuth,
      crewPMAuth,
    });
  };

  return (
    <li
      key={`fwVoteNotice-${noticeId}`}
      className={`flex items-center gap-x-10 px-3 py-5 pc:text-lg mobile:text-sm text-grey900 cursor-pointer`}
      onClick={handleClickNoticeItem}
    >
      <div className='flex items-center gap-x-4'>
        <NoticeBadge noticeType={NOTICE_TYPES.PRA1003.code}>
          {NOTICE_TYPES.PRA1003.name}
        </NoticeBadge>
        <VoteStatusBadge voteStatus={voteStatus.code}>
          {voteStatus.name}
        </VoteStatusBadge>
        {contents}
      </div>
      <div className='ml-auto text-grey600'>{createDate}</div>
    </li>
  );
};

export default FWVoteNoticeItem;
