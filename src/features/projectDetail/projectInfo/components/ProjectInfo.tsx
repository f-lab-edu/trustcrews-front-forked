'use client';

import TechStackImage from '@/features/techStack/components/TechStackImage';
import { useRecoilValue } from 'recoil';
import { useProjectSummaryInfo } from '@/features/projectDetail/projectInfo/api/getProjectInfoSummary';
import { projectIdState } from '@/store/projectDetail/ProjectIdStateStore';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import ProjectInfoItem from '@/features/projectDetail/projectInfo/components/ProjectInfoItem';

const ProjectInfo = () => {
  const projectId = useRecoilValue(projectIdState);
  const {
    data: { data },
  } = useProjectSummaryInfo(numStrToBigInt(projectId));

  const { projectName, projectSubject, startDate, endDate, technologyStacks } =
    data;

  const techStackBadges = (
    <ul className='flex items-center space-x-1'>
      {technologyStacks.map((stack) => (
        <TechStackImage
          key={stack.techStackId.toString()}
          stackName={stack.techStackName}
          width={32}
          height={32}
        />
      ))}
    </ul>
  );

  return (
    <section className='w-full min-h-[200px] flex mobile:flex-col items-center justify-start mobile:justify-center tablet:mt-[40px] mobile:mt-[10px] pc:divide-x-2'>
      <div className='mobile:w-full flex-col pr-20 tablet:w-[460px]'>
        <div className='text-5xl mobile:text-[24px] font-medium'>
          <div aria-hidden={true}>{projectName}</div>
          <div className='sr-only'>프로젝트 이름 : {projectName}</div>
        </div>
      </div>
      <div className='mobile:w-full h-full flex-col tablet:pl-20 mobile:p-1 mobile:mt-3 tablet:text-[1.25rem] mobile:text-[14px] font-semibold mobile:bg-ground200 mobile:rounded-md'>
        <ProjectInfoItem title='기간' contents={`${startDate} ~ ${endDate}`} />
        <ProjectInfoItem title='주제' contents={projectSubject} />
        <ProjectInfoItem title='기술스택' contents={techStackBadges} />
      </div>
    </section>
  );

  // if (isDataError)
  //   return (
  //     <ErroredSection className='w-full min-h-[200px] flex mobile:flex-col items-center justify-center tablet:mt-[40px] mobile:mt-[10px] text-3xl mobile:text-[24px]'>
  //       ⚠️ 데이터 조회에 실패했습니다.
  //     </ErroredSection>
  //   );
};

export default ProjectInfo;
