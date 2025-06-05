'use client';

import { useTransition } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  PROJECT_MENU,
  projectActiveNavState,
} from '@/store/projectDetail/ProjectNavTabStateStore';
import { crewIdState } from '@/store/projectDetail/crew/CrewIdStateStore';
import { projectIdState } from '@/store/projectDetail/ProjectIdStateStore';
import { useProjectCrewList } from '@/features/projectDetail/crews/api/getProjectCrewList';
import Avatar from '@/shared/ui/Avatar';
import Badge from '@/shared/ui/Badge';
import PMAuthBadge from '@/features/pmAuth/components/PMAuthBadge';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { ProjectCrew } from '@/types/data/projectDetail/crew/projectCrew';

const {
  CREWS: {
    child: {
      CREW_DETAIL: { value: PROJECT_CREW_DETAIL },
    },
  },
} = PROJECT_MENU;

const ProjectCrews = () => {
  const setActiveNavTab = useSetRecoilState(projectActiveNavState);
  const [_, startTransition] = useTransition();
  const setCrewIdState = useSetRecoilState(crewIdState);
  const projectId = useRecoilValue(projectIdState);
  const {
    data: {
      data: { projectCrews: crewList },
    },
  } = useProjectCrewList(numStrToBigInt(projectId));

  const handleClickCrew = (crewId: bigint) => {
    startTransition(() => {
      setActiveNavTab(PROJECT_CREW_DETAIL);
    });
    setCrewIdState(crewId);
  };

  return (
    <section className='w-full flex flex-col items-center px-1'>
      <section className='w-full mobile:max-h-[400px] mx-auto  mobile:overflow-y-scroll'>
        <ul role='list' className='min-h-[350px]'>
          {crewList.map(
            ({
              position: { positionName },
              crewPMAuth,
              user: { userId: projectMemberUseId, nickname, profileImgSrc },
              crewId,
            }: ProjectCrew) => {
              return (
                <li
                  key={projectMemberUseId}
                  className='cursor flex items-center gap-x-6 py-5 cursor-pointer hover:bg-grey000 border-b border-grey300'
                  onClick={() => handleClickCrew(crewId)}
                >
                  <div className='w-full min-w-0 flex mobile:flex-col items-center mobile:items-start mobile:space-y-3 tablet:px-6 mobile:pl-4'>
                    <div className='min-w-0 flex items-center tablet:space-x-6 mobile:space-x-4'>
                      <Avatar
                        size='xs'
                        src={profileImgSrc}
                        alt='크루 아바타 이미지'
                      />
                      <p className='tablet:text-[1.2rem] mobile:text-sm font-semibold leading-5 text-gray-900'>
                        {nickname}
                      </p>
                      <ul className='flex items-center space-x-3'>
                        <li>
                          <Badge text={positionName} />
                        </li>
                        <li>
                          <PMAuthBadge auth={crewPMAuth.code}>
                            {crewPMAuth.name}
                          </PMAuthBadge>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              );
            },
          )}
        </ul>
      </section>
    </section>
  );
};

export default ProjectCrews;
