import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getVAlertFWDetail} from "@/service/project/alert/vote/fwithdraw";
import {VAlertFWDetailData} from "@/service/project/alert/type";
import {ResponseBody} from "@/utils/type";
import Avatar from "@/components/ui/Avatar";
import PositionBadge from "@/components/ui/badge/PositionBadge";
import ProjectRoleBadge from "@/components/ui/badge/ProjectRoleBadge";
import VoteStatusBadge from "@/components/ui/badge/VoteStatusBadge";
import {VoteOption} from "@/service/project/vote/constant";
import {VoteFWReqData, VoteOptionCode} from "@/service/project/vote/type";
import {useRecoilValue} from "recoil";
import {projectIdState} from "@/store/project/ProjectInfoStateStore";
import {numStrToBigInt} from "@/utils/common";
import useVoteFwithdraw from "@/hooks/project/useVoteFwithdraw";
import VAlertFwModalSkeleton from "@/components/ui/skeleton/project/alert/VAlertFWModalSkeleton";
import useCurrentUserPMAuth from "@/hooks/project/useCurrentUserPMAuth";
import VoteBar from "@/components/ui/votebar/VoteBar";

type VAlertFWModalContentsProps = {
    voteId: bigint;
    fwMemberId: bigint;
}

function VAlertFwModalContents({voteId, fwMemberId}: VAlertFWModalContentsProps) {
    const projectId = useRecoilValue(projectIdState);
    const {currentUserPMAuth, isFetchingCurrentUserPMAuth} = useCurrentUserPMAuth(projectId);

    const {voteForProjectFWithdraw, isUpdating} = useVoteFwithdraw();

    const {data, isPending, isError} = useQuery<ResponseBody<VAlertFWDetailData>, Error>({
        queryKey: ["vAlertFWDetailData", voteId, fwMemberId],
        queryFn: () => getVAlertFWDetail(voteId, fwMemberId),
        staleTime: 0
    });

    if (isPending || isFetchingCurrentUserPMAuth || isUpdating) return <VAlertFwModalSkeleton/>;

    if (isError || !data.data || !currentUserPMAuth) return (
        <div className='alertModal_contents text-3xl text-gray-600/90 text-center'>⚠️데이터를
            불러올 수 없습니다
        </div>
    );

    const {
        fwMemberAuth,
        fwMemberPosition: {name: fwMemberPositionName},
        fwUserNickname,
        fwUserProfile,
        voteStatus,
        agrees,
        disagrees,
        maxVoteCount,
        reason
    } = data.data;

    const isVoteEnded = voteStatus.name === "투표종료";

    const onChangeVoteOptionHandler = (value: string) => {
        const reqData: VoteFWReqData = {
            projectId: numStrToBigInt(projectId as string),
            voteId,
            fw_member_id: fwMemberId,
            fw_member_auth: fwMemberAuth.code,
            authMap: currentUserPMAuth.code,
            answer: value as VoteOptionCode
        };
        voteForProjectFWithdraw(reqData);
    }


    return (
        <section className='alertModal_contents'>
            <section
                className='tablet:max-w-[400px] mx-auto pt-5 flex-col items-center'>
                <div><Avatar src={fwUserProfile} alt='강제탈퇴 멤버 아바타' size='md'/></div>
                <h3 className='my-1 text-[1.4rem] text-greyDarkBlue font-medium'>{fwUserNickname}</h3>
                <div className='mx-auto flex justify-center space-x-2'>
                    <ProjectRoleBadge text={fwMemberAuth.name} />
                    <PositionBadge text={fwMemberPositionName} />
                </div>
            </section>
            <section
                className='tablet:max-w-[400px] h-[100px] mx-auto mt-8 flex flex-col justify-center space-y-3 bg-ground200 rounded-md'>
                <h3 className='text-xl text-greyDarkBlue font-semibold'>강제탈퇴 사유</h3>
                <p className='text-[18px] font-medium text-grey900 text-center'>{reason.name}</p>
            </section>
            <section className='tablet:max-w-[400px] h-[250px] mx-auto flex flex-col justify-center space-y-5'>
                <div className='flex justify-center items-center space-x-1 text-2xl text-greyDarkblue font-medium'>
                    <span>투표</span>
                    <VoteStatusBadge voteStatus={voteStatus}/>
                </div>
                {
                    isVoteEnded &&
                    <p className='pb-2 text-[18px] text-lg text-secondary font-semibold'>
                        {
                            agrees > disagrees
                                ? `'${fwUserNickname}님의 강제탈퇴' 안이 가결되었습니다.`
                                : `'${fwUserNickname}님의 강제탈퇴' 안이 부결되었습니다.`
                        }
                    </p>
                }
                <VoteBar
                    group='fwVote'
                    label='찬성'
                    value={VoteOption.VODA1001.code}
                    counts={agrees}
                    maxCounts={maxVoteCount}
                    disabled={isVoteEnded}
                    onChangeVoteHandler={onChangeVoteOptionHandler}
                />
                <VoteBar
                    group='fwVote'
                    label='반대'
                    value={VoteOption.VODA1002.code}
                    counts={disagrees}
                    maxCounts={maxVoteCount}
                    disabled={isVoteEnded}
                    onChangeVoteHandler={onChangeVoteOptionHandler}
                />
            </section>

        </section>
    );
}

export default VAlertFwModalContents;