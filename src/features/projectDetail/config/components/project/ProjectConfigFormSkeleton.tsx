import InputStyleSkeleton from '@/shared/ui/skeleton/InputStyleSkeleton';
import ConfigContainer from '@/features/projectDetail/config/layouts/ConfigContainer';
import ConfigSummary from '@/features/projectDetail/config/layouts/ConfigSummary';
import ConfigContents from '@/features/projectDetail/config/layouts/ConfigContents';

const ProjectConfigFormSkeleton = () => {
  return (
    <ConfigContainer>
      <ConfigSummary>프로젝트 정보</ConfigSummary>
      <ConfigContents>
        <InputStyleSkeleton label='프로젝트 이름' />
        <InputStyleSkeleton label='프로젝트 주제' />
        <div className='row-span-2'>
          <div className='w-[380px] tablet:w-full space-y-10 mobile:mx-auto'>
            <InputStyleSkeleton label='시작 날짜' />
            <InputStyleSkeleton label='종료 날짜' />
          </div>
        </div>
        <InputStyleSkeleton label='기술 스택' />
      </ConfigContents>
    </ConfigContainer>
  );
};

export default ProjectConfigFormSkeleton;
