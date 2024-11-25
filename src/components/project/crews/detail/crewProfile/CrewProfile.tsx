'use client';
import React from 'react';
import Avatar from "@/components/ui/Avatar";
import PositionBadge from "@/components/ui/badge/PositionBadge";
import ProjectRoleBadge from "@/components/ui/badge/ProjectRoleBadge";
import CrewOutButton from "@/components/project/crews/detail/CrewOutButton";
import ProfileSectionSkeleton from "@/components/ui/skeleton/project/crews/detail/ProfileSectionSkeleton";
import useProjectMember from "@/hooks/project/crew/useProjectMember";
import {getCookie} from "cookies-next";
import CrewFwButton from "@/components/project/crews/detail/CrewFWButton";
import CrewProfileItem from "@/components/project/crews/detail/crewProfile/CrewProfileItem";
import TechStackImage from "@/components/ui/TechStackImage";
import {TechStackItem} from "@/utils/type";
import TrustGradeBadge from "@/components/ui/badge/TrustGradeBadge";


function CrewProfile({projectMemberId}: { projectMemberId: string }) {
    const currentUserId = getCookie('user_id');
    const {projectMemberInfo, isFetching} = useProjectMember(projectMemberId);

    if (isFetching) return <ProfileSectionSkeleton/>;

    const {user, position, status, projectMemberAuth} = projectMemberInfo!;
    const isMemberCurrentUser = currentUserId === user.userId.toString();

    const techStacks = (
        <ul className='flex items-center space-x-1'>
            {
                user.technologyStacks.map((stack: TechStackItem) => (
                    <li key={stack.techStackId}>
                        <TechStackImage stackName={stack.techStackName} width={32} height={32}/>
                    </li>
                ))
            }
        </ul>
    );

    return (
        <div
            className="flex mobile:flex-col mobile:space-y-6 mobile:mt-4 px-1 py-4 mx-auto items-center justify-center">
            <section className='mobile:w-full pc:w-[200px] tablet:w-[150px] tablet:mr-10 flex flex-col items-center'>
                <Avatar size="md" src={user.profileImgSrc} alt="크루 프로필"/>
                <ul className="my-3 flex flex-col items-center">
                    <li className="flex items-center space-x-1 pc:text-2xl tablet:text-[1.3rem] mobile:text-lg font-medium text-greyDarkBlue">
                        <span className='leading-loose'>
                            {user.nickname}
                        </span>
                        <TrustGradeBadge text={user.trustGrade.name} size='md'/>
                    </li>
                </ul>
                {
                    isMemberCurrentUser
                        ? <CrewOutButton projectMemberInfo={projectMemberInfo!}/>
                        : <CrewFwButton projectMemberInfo={projectMemberInfo!}/>
                }
            </section>
            <section
                className='mobile:w-full tablet:h-[200px] mobile:h-[180px] flex flex-col flex-wrap justify-between p-6 mobile:p-4 bg-ground100 rounded-lg'>
                <CrewProfileItem
                    label="프로젝트 권한"
                    contents={<ProjectRoleBadge text={projectMemberAuth.name} size='sm'/>}
                />
                <CrewProfileItem
                    label="프로젝트 포지션"
                    contents={<PositionBadge text={position.name} size='sm'/>}
                />
                <CrewProfileItem
                    label="기술스택"
                    contents={techStacks}
                />
                <CrewProfileItem
                    label="신뢰점수"
                    contents={
                        <span
                            className='pc:text-lg tablet:text-base mobile:text-sm font-semibold'>
                            {user.trustScore} 점
                        </span>
                    }
                />
            </section>
        </div>
    );
}

export default CrewProfile;