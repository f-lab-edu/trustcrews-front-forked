'use client';
import React from "react";
import Avatar from "@/components/ui/Avatar";
import ProjectRoleBadge from "@/components/ui/badge/ProjectRoleBadge";
import Link from "next/link";
import PositionBadge from "@/components/ui/badge/PositionBadge";
import useProjectCrewList from "@/hooks/project/crew/useProjectCrewList";
import {ProjectMember} from "@/utils/type";
import CrewListSkeleton from "@/components/ui/skeleton/project/crews/CrewListSkeleton";

export default function CrewList({projectId, userId}: { projectId: string, userId: string }) {
    const {crewList, isFetching} = useProjectCrewList(projectId);

    if (isFetching) return <CrewListSkeleton/>

    return (
        <ul role="list" className='min-h-[350px]'>
            {crewList.map(
                ({
                     position: {name},
                     projectMemberAuth: {name:projectMemberAuthName},
                     user: {userId: projectMemberUseId, nickname, profileImgSrc},
                     projectMemberId
                 }: ProjectMember) => {
                    return (
                        <li key={projectMemberUseId}
                            className="flex items-center gap-x-6 py-5 cursor-pointer hover:bg-grey000 border-b border-grey300">
                            <Link
                                href={{
                                    pathname: `/projectCrewDetail`,
                                    query: {projectId, projectMemberId: projectMemberId.toString(), userId}
                                }}
                                className="w-full min-w-0 flex mobile:flex-col items-center mobile:items-start mobile:space-y-3 tablet:px-6 mobile:pl-4">
                                <div className="min-w-0 flex items-center tablet:space-x-6 mobile:space-x-4">
                                    <Avatar size='xs' src={profileImgSrc} alt={`${nickname}의 프로필 이미지`}/>
                                    <p className="tablet:text-[1.2rem] mobile:text-sm font-semibold leading-5 text-gray-900">
                                        {nickname}
                                    </p>
                                    <ul className='flex items-center space-x-3'>
                                        <li><PositionBadge text={name} /></li>
                                        <li><ProjectRoleBadge text={projectMemberAuthName} /></li>
                                    </ul>
                                </div>
                            </Link>
                        </li>
                    )
                })}
        </ul>
    )
}
