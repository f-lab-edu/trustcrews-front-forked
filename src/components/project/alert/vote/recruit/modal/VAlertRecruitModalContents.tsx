import React from 'react';
import Avatar from "@/components/ui/Avatar";
import {ResponseBody, TechStackItem} from "@/utils/type";
import TechStackImage from "@/components/ui/TechStackImage";
import TrustGradeBadge from "@/components/ui/badge/TrustGradeBadge";
import {VAlertRecruitDetailData} from "@/service/project/alert/type";
import {useQuery} from "@tanstack/react-query";
import {getVAlertRecruitDetail} from "@/service/project/alert/vote/recruit";
import VAlertRecruitModalSkeleton from "@/components/ui/skeleton/project/alert/VAlertRecruitModalSkeleton";
import VoteStatusBadge from "@/components/ui/badge/VoteStatusBadge";
import useVoteRecruit from "@/hooks/project/useVoteRecruit";
import {VoteOptionCode, VoteRecruitReqData} from "@/service/project/vote/type";
import {VoteOption} from "@/service/project/vote/constant";
import {projectIdState} from "@/store/project/ProjectInfoStateStore";
import {useRecoilValue} from "recoil";
import useCurrentUserPMAuth from "@/hooks/project/useCurrentUserPMAuth";
import ApplicantProjectHistory from "@/components/project/alert/vote/recruit/modal/ApplicantProjectHisotry";
import VoteBar from "@/components/ui/votebar/VoteBar";

type VAlertRecruitModalContentsProps = {
    voteId: bigint;
    applyId: bigint;
    alertId: bigint;
}

function VAlertRecruitModalContents({voteId, applyId, alertId}: VAlertRecruitModalContentsProps) {
    const projectId = useRecoilValue(projectIdState);
    const {currentUserPMAuth, isFetchingCurrentUserPMAuth} = useCurrentUserPMAuth(projectId);

    const {voteForProjectRecruit, isUpdating} = useVoteRecruit();

    const {data, isPending, isError} = useQuery<ResponseBody<VAlertRecruitDetailData>, Error>({
        queryKey: ['vAlertRecruitDetailData', voteId, applyId, alertId],
        queryFn: () => getVAlertRecruitDetail(alertId, applyId, voteId),
        staleTime: 0
    });

    if (isPending || isUpdating || isFetchingCurrentUserPMAuth) return <VAlertRecruitModalSkeleton/>;

    if (isError || !data.data || !currentUserPMAuth) return (
        <div
            className='alertModal_contents text-3xl text-gray-600/90 text-center'>⚠️데이터를
            불러올 수 없습니다
        </div>
    );

    const {
        applicantInfo: {
            profileImgSrc,
            nickname,
            position: {positionName},
            intro,
            techStacks,
            projectHistoryTotalCount,
            trustGrade: {trustGradeName},
            trustScore,
            userId
        },
        voteInfo: {
            voteStatus,
            agrees,
            disagrees,
            maxVoteCount
        }
    } = data.data;

    const isVoteEnded = voteStatus.name === "투표종료";

    const onChangeVoteOptionHandler = (value: string) => {
        const reqData: VoteRecruitReqData = {
            voteId,
            applyId,
            authMap: currentUserPMAuth.code,
            answer: value as VoteOptionCode
        };
        voteForProjectRecruit(reqData);
    }

    return (
        <section className='alertModal_contents'>
            <section className='tablet:max-w-[400px] mx-auto pt-5 flex-col items-center border-b border-grey300 '>
                <div><Avatar src={profileImgSrc} alt='사용자 아바타' size='sm'/></div>
                <h3 className='my-1 text-[1.2rem] text-greyDarkBlue font-medium'>{nickname}</h3>
                <div className='text-md text-greyBlue font-medium'>{positionName}</div>
                <div className='mt-1 text-sm text-grey700'>{intro}</div>
                <ul className='mt-2 flex items-center justify-center space-x-1'>
                    {
                        techStacks.map(({techStackName}: TechStackItem) => {
                            return (
                                <li
                                    key={techStackName}
                                    className='relative h-10 w-10'
                                >
                                    <TechStackImage stackName={techStackName.toLowerCase()}/>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className='mt-5 mb-7 flex items-center justify-center space-x-4'>
                    <div className='flex flex-col px-3 border-r-2 border-grey300'>
                        <span className='mb-2 text-md font-medium text-greyBlue'>프로젝트</span>
                        <span className='text-md text-grey900'>
                            {projectHistoryTotalCount}
                        </span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='mb-2 text-md font-medium text-greyBlue'>신뢰등급</span>
                        <span className='text-grey900'>
                            <TrustGradeBadge size='xs' text={trustGradeName} badgeStyle='text'/>
                        </span>
                    </div>
                    <div className='flex flex-col pl-3 border-l-2 border-grey300'>
                        <span className='mb-2 text-md font-medium text-greyBlue'>신뢰점수</span>
                        <span className='text-md text-grey900'>{trustScore}점</span>
                    </div>
                </div>
                <ApplicantProjectHistory applicantUserId={userId!}/>
            </section>
            <section className='tablet:max-w-[400px] h-[250px] mx-auto flex flex-col justify-center space-y-5'>
                <div className='flex justify-center items-center space-x-1 text-2xl text-greyDarkblue font-medium'>
                    <span>투표</span>
                    <VoteStatusBadge size='sm' voteStatus={voteStatus}/>
                </div>
                {
                    isVoteEnded &&
                    <p className='pb-2 text-[18px] text-lg text-secondary font-semibold'>
                        {
                            agrees > disagrees
                                ? `'${nickname}님이 프로젝트 합류' 안이 가결되었습니다.`
                                : `'${nickname}님의 프로젝트 합류' 안이 부결되었습니다.`
                        }
                    </p>
                }
                <VoteBar
                    group='recruitVote'
                    label='찬성'
                    value={VoteOption.VODA1001.code}
                    onChangeVoteHandler={onChangeVoteOptionHandler}
                    counts={agrees}
                    maxCounts={maxVoteCount}
                    disabled={isVoteEnded}
                />
                <VoteBar
                    group='recruitVote'
                    label='반대'
                    value={VoteOption.VODA1002.code}
                    onChangeVoteHandler={onChangeVoteOptionHandler}
                    counts={disagrees}
                    maxCounts={maxVoteCount}
                    disabled={isVoteEnded}
                />
            </section>
        </section>
    );
}

export default VAlertRecruitModalContents;