import ProjectConfigFormSkeleton from '@/features/projectDetail/config/components/project/ProjectConfigFormSkeleton';
import PMAuthSkeleton from '@/features/projectDetail/config/components/pmAuth/PMAuthSkeleton';
import ConfigSummary from '@/features/projectDetail/config/layouts/ConfigSummary';
import ConfigContainer from '@/features/projectDetail/config/layouts/ConfigContainer';
import ButtonSkeleton from '@/shared/ui/skeleton/ButtonSkeleton';
import PostConfigFormSkeleton from '@/features/projectDetail/config/components/post/PostConfigFormSkeleton';

const ProjectConfigSkeleton = () => {
  return (
    <section className='w-full mx-auto space-y-[100px]'>
      <ProjectConfigFormSkeleton />
      <PostConfigFormSkeleton />
      <PMAuthSkeleton />
      <ConfigContainer>
        <ConfigSummary>프로젝트 종료</ConfigSummary>
        <div className='w-[380px] tablet:w-full flex flex-col items-start justify-center'>
          <p className='text-danger font-medium mb-5'>
            &#8251; 프로젝트 종료시, 획득한 신뢰점수를 제외한 프로젝트와 관련된
            모든 정보가 삭제됩니다. 반드시 멤버들과 상의후 종료해주세요.
          </p>
          <ButtonSkeleton size='md'>프로젝트 종료</ButtonSkeleton>
        </div>
      </ConfigContainer>
    </section>
  );
};

export default ProjectConfigSkeleton;
