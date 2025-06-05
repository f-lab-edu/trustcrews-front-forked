import Avatar from '@/shared/ui/Avatar';
import Badge from '@/shared/ui/Badge';
import PMAuthBadge from '@/features/pmAuth/components/PMAuthBadge';
import VoteStatusBadge from '@/features/projectDetail/vote/components/VoteStatusBadge';
import { useRecoilValue } from 'recoil';
import FWVoteNoticeDetailSkeleton from '@/features/projectDetail/notice/components/fwVoteNotice/modal/FWVoteNoticeDetailSkeleton';
import VoteBar from '@/features/projectDetail/vote/components/VoteBar';
import { VOTE_OPTIONS } from '@/constants/data/projectDetail/vote/voteOptions';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { useFWVoteNotice } from '@/features/projectDetail/notice/api/fwVoteNotice/getFWVoteNotice';
import { fwNoticeModalState } from '@/store/projectDetail/notice/fwVoteNotice/FWVoteNoticeModalStateStore';
import { ZodError } from 'zod';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import {
  fWVoteAnswerInputSchema,
  useForceWithdrawVote,
} from '@/features/projectDetail/vote/api/forceWithdrawVote';

const {
  VODA1001: { code: VOTE_AGREE },
  VODA1002: { code: VOTE_DISAGREE },
} = VOTE_OPTIONS;

const FWVoteNoticeDetail = () => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();

  const { projectId, voteId, crewId, crewPMAuth, userPMAuth } =
    useRecoilValue(fwNoticeModalState);

  const { mutate: forceWithdrawVote, isPending: isUpdating } =
    useForceWithdrawVote(
      {
        projectId: numStrToBigInt(projectId),
        voteId: numStrToBigInt(voteId),
        crewId: numStrToBigInt(crewId),
        userPMAuth,
        crewPMAuth,
      },
      {
        onSuccess: (res) => setSuccessSnackbar(res.message),
        onError: (error) => setErrorSnackbar(error.message),
      },
    );

  const {
    data: { data: noticeDetail },
  } = useFWVoteNotice(numStrToBigInt(voteId), numStrToBigInt(crewId));

  if (isUpdating) return <FWVoteNoticeDetailSkeleton />;

  const {
    crewPMAuth: { name: crewAuthName, code: crewAuthCode },
    crewPosition: { name: crewPositionName },
    crewNickname,
    crewProfileImgSrc,
    voteStatus: { name: voteStatusName, code: voteStatusCode },
    agrees,
    disagrees,
    maxVoteCount,
    reason,
  } = noticeDetail;

  const isVoteEnded = voteStatusName === '투표종료';

  const handleChangeVoteOption = (value: string) => {
    try {
      fWVoteAnswerInputSchema.parse({ answer: value });
    } catch (e: unknown) {
      if (e instanceof ZodError) {
        setErrorSnackbar(e.errors[0].message);
        return;
      }
    }
    forceWithdrawVote({ answer: value });
  };

  return (
    <section className='alertModal_contents'>
      <section className='tablet:max-w-[400px] mx-auto pt-5 flex-col items-center'>
        <div>
          <Avatar src={crewProfileImgSrc} alt='크루 아바타 이미지' size='md' />
        </div>
        <h3 className='my-1 text-[1.4rem] text-greyDarkBlue font-medium'>
          {crewNickname}
        </h3>
        <div className='mx-auto flex justify-center space-x-2'>
          <PMAuthBadge auth={crewAuthCode}>{crewAuthName}</PMAuthBadge>
          <Badge text={crewPositionName} />
        </div>
      </section>
      <section className='tablet:max-w-[400px] h-[100px] mx-auto mt-8 flex flex-col justify-center space-y-3 bg-ground200 rounded-md'>
        <h3 className='text-xl text-greyDarkBlue font-semibold'>
          강제탈퇴 사유
        </h3>
        <p className='text-[18px] font-medium text-grey900 text-center'>
          {reason.desc}
        </p>
      </section>
      <section className='tablet:max-w-[400px] h-[250px] mx-auto flex flex-col justify-center space-y-5'>
        <div className='flex justify-center items-center space-x-1 text-2xl text-greyDarkblue font-medium'>
          <span>투표</span>
          <VoteStatusBadge voteStatus={voteStatusCode}>
            {voteStatusName}
          </VoteStatusBadge>
        </div>
        {isVoteEnded && (
          <p className='pb-2 text-[18px] text-lg text-secondary font-semibold'>
            {agrees > disagrees
              ? `'${crewNickname}님의 강제탈퇴' 안이 가결되었습니다.`
              : `'${crewNickname}님의 강제탈퇴' 안이 부결되었습니다.`}
          </p>
        )}
        <VoteBar
          group='fwVote'
          label='찬성'
          voteOption={VOTE_AGREE}
          counts={agrees}
          maxCounts={maxVoteCount}
          disabled={isVoteEnded}
          onChangeVoteHandler={handleChangeVoteOption}
        />
        <VoteBar
          group='fwVote'
          label='반대'
          voteOption={VOTE_DISAGREE}
          counts={disagrees}
          maxCounts={maxVoteCount}
          disabled={isVoteEnded}
          onChangeVoteHandler={handleChangeVoteOption}
        />
      </section>
    </section>
  );
};

export default FWVoteNoticeDetail;
