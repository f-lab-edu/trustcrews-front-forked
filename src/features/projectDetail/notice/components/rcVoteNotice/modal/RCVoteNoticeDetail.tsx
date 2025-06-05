import Avatar from '@/shared/ui/Avatar';
import TechStackImage from '@/features/techStack/components/TechStackImage';
import TrustGradeBadge from '@/features/trustGrade/components/TrustGradeBadge';
import RCVoteNoticeDetailSkeleton from '@/features/projectDetail/notice/components/rcVoteNotice/modal/RCVoteNoticeDetailSkeleton';
import VoteStatusBadge from '@/features/projectDetail/vote/components/VoteStatusBadge';
import RCTargetProjectHistory from '@/features/projectDetail/notice/components/rcVoteNotice/modal/RCTargetProjectHistory';
import VoteBar from '@/features/projectDetail/vote/components/VoteBar';
import { VOTE_OPTIONS } from '@/constants/data/projectDetail/vote/voteOptions';
import {
  recruitVoteAnswerInputSchema,
  useRecruitVote,
} from '@/features/projectDetail/vote/api/recruitVote';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { useRecruitNotice } from '@/features/projectDetail/notice/api/rcVoteNotice/getRCVoteNotice';
import { useRecoilValue } from 'recoil';
import { rcVoteNoticeModalState } from '@/store/projectDetail/notice/rcVoteNotice/RCVoteNoticeModalStateStore';
import { ZodError } from 'zod';
import Loader from '@/shared/ui/Loader';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { TechStack } from '@/types/data/techStack';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';

const {
  VODA1001: { code: VOTE_AGREE },
  VODA1002: { code: VOTE_DISAGREE },
} = VOTE_OPTIONS;

const RCVoteNoticeDetail = () => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const { noticeId, voteId, applyId, userPMAuth } = useRecoilValue(
    rcVoteNoticeModalState,
  );

  const { mutate: recruitVote, isPending: isUpdating } = useRecruitVote(
    {
      voteId: numStrToBigInt(voteId),
      applyId: numStrToBigInt(applyId),
      userPMAuth,
    },
    {
      onSuccess: (res) => setSuccessSnackbar(res.message),
      onError: (error) => setErrorSnackbar(error.message),
    },
  );

  const {
    data: { data: noticeDetail },
  } = useRecruitNotice(
    numStrToBigInt(voteId),
    numStrToBigInt(applyId),
    numStrToBigInt(noticeId),
  );

  if (isUpdating) return <RCVoteNoticeDetailSkeleton />;

  const {
    applicantInfo: {
      profileImgSrc,
      nickname,
      position: { positionName },
      intro,
      techStacks,
      projectHistoryTotalCount,
      trustGrade: { trustGradeName },
      trustScore,
      userId,
    },
    voteInfo: {
      voteStatus: { code: voteStatusCode, name: voteStatusName },
      agrees,
      disagrees,
      maxVoteCount,
    },
  } = noticeDetail;

  const isVoteEnded = voteStatusName === '투표종료';

  const handleChangeVoteOption = (value: string) => {
    try {
      recruitVoteAnswerInputSchema.parse({ answer: value });
    } catch (e: unknown) {
      if (e instanceof ZodError) {
        setErrorSnackbar(e.errors[0].message);
        return;
      }
    }
    recruitVote({ answer: value });
  };

  return (
    <section className='alertModal_contents'>
      <section className='tablet:max-w-[400px] mx-auto pt-5 flex-col items-center border-b border-grey300 '>
        <div>
          <Avatar
            src={profileImgSrc || ''}
            alt='크루 아바타 이미지'
            size='sm'
          />
        </div>
        <h3 className='my-1 text-[1.2rem] text-greyDarkBlue font-medium'>
          {nickname}
        </h3>
        <div className='text-md text-greyBlue font-medium'>{positionName}</div>
        <div className='mt-1 text-sm text-grey700'>{intro}</div>
        <ul className='mt-2 flex items-center justify-center space-x-1'>
          {techStacks.map(({ techStackName }: TechStack) => {
            return (
              <li key={techStackName} className='relative h-10 w-10'>
                <TechStackImage stackName={techStackName.toLowerCase()} />
              </li>
            );
          })}
        </ul>
        <div className='mt-5 mb-7 flex items-center justify-center space-x-4'>
          <div className='flex flex-col px-3 border-r-2 border-grey300'>
            <span className='mb-2 text-md font-medium text-greyBlue'>
              프로젝트
            </span>
            <span className='text-md text-grey900'>
              {projectHistoryTotalCount}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='mb-2 text-md font-medium text-greyBlue'>
              신뢰등급
            </span>
            <span className='text-grey900'>
              <TrustGradeBadge
                size='xs'
                trustGrade={trustGradeName}
                badgeStyle='text'
              />
            </span>
          </div>
          <div className='flex flex-col pl-3 border-l-2 border-grey300'>
            <span className='mb-2 text-md font-medium text-greyBlue'>
              신뢰점수
            </span>
            <span className='text-md text-grey900'>{trustScore}점</span>
          </div>
        </div>
        <FieldQueryBoundary
          errorFallbackSize='md'
          suspenseFallback={<Loader />}
        >
          <RCTargetProjectHistory applicantUserId={userId} />
        </FieldQueryBoundary>
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
              ? `'${nickname}님이 프로젝트 합류' 안이 가결되었습니다.`
              : `'${nickname}님의 프로젝트 합류' 안이 부결되었습니다.`}
          </p>
        )}
        <VoteBar
          group='recruitVote'
          label='찬성'
          voteOption={VOTE_AGREE}
          onChangeVoteHandler={handleChangeVoteOption}
          counts={agrees}
          maxCounts={maxVoteCount}
          disabled={isVoteEnded}
        />
        <VoteBar
          group='recruitVote'
          label='반대'
          voteOption={VOTE_DISAGREE}
          onChangeVoteHandler={handleChangeVoteOption}
          counts={disagrees}
          maxCounts={maxVoteCount}
          disabled={isVoteEnded}
        />
      </section>
    </section>
  );
};

export default RCVoteNoticeDetail;
