'use client';
import React from "react";
import {useRouter} from 'next/navigation';
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import TechStackBadge from '@/components/ui/badge/TechStackBadge';
import UserProjectInfo from "./UserProjectInfo";
import {useProfileInfo} from "@/hooks/user/useProfileInfo";
import ProfileCardSkeleton from "@/components/user/profile/ProfileCardSkeleton";

function ProfileCard() {
    const router = useRouter();
    const {data, isFetching} = useProfileInfo();

    if (isFetching) return <ProfileCardSkeleton/>;
    const {
        nickname,
        profileImgSrc,
        trustScore,
        trustGrade,
        position,
        techStacks,
        intro,
        projectHistoryTotalCount
    } = data!.data!;

    return (
        <div className='rounded-lg border-2 border-gray-200 bg-white mt-3 mobile:mt-2 px-2'>
            <div className="space-y-2 mobile:space-y-1 w-full h-fit text-center my-6 mobile:my-4">
                <Avatar size="md" src={profileImgSrc} alt="빈 프로필"/>
                <div className="max-w-[300px] m-auto">
                    <p className="text-xl mobile:text-lg">{nickname}</p>
                    <p className="text-lg mobile:text-base text-grey700">{position.positionName}</p>
                    <p className="text-sm mobile:text-xs text-grey500">{intro}</p>
                </div>
                <div>
                    {
                        techStacks.length > 0 && techStacks.map((stack) =>
                            <TechStackBadge key={stack.techStackId} text={stack.techStackName} size='xs'
                                            className="mx-0.5 w-[70px] mobile:w-[50px] justify-center"/>
                        )
                    }
                </div>
                <UserProjectInfo count={projectHistoryTotalCount} grade={trustGrade.trustGradeName} score={trustScore}/>
                <div className="pt-3 mobile:pt-2">
                    <Button size="md" theme="primary-hollow" onClickHandler={() => router.push("/user/setting")}>프로필
                        수정</Button>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;