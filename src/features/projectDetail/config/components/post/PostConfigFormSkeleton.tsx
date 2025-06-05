import Skeleton from '@/shared/ui/skeleton/Skeleton';
import InputStyleSkeleton from '@/shared/ui/skeleton/InputStyleSkeleton';
import ButtonSkeleton from '@/shared/ui/skeleton/ButtonSkeleton';
import ConfigContainer from '@/features/projectDetail/config/layouts/ConfigContainer';
import ConfigSummary from '@/features/projectDetail/config/layouts/ConfigSummary';
import ConfigContents from '@/features/projectDetail/config/layouts/ConfigContents';

const PostConfigFormSkeleton = () => {
  return (
    <ConfigContainer>
      <ConfigSummary>모집 게시글</ConfigSummary>
      <ConfigContents>
        <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto'>
          <div className='relative mobile:text-sm'>
            <span className='text-gray-700'>모집 상태</span>
            <Skeleton className='h-8 w-14 mt-2 flex-shrink-0 rounded-full' />
          </div>
        </div>
        <InputStyleSkeleton label='게시글 제목' />
        <InputStyleSkeleton label='모집 분야' />
        <InputStyleSkeleton label='연락 방법' />
        <div className='w-full mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto col-span-2'>
          <div className='relative mobile:text-sm'>
            <span className='text-gray-700'>프로젝트 소개</span>
            <Skeleton className='w-full h-[250px] py-2 px-4' />
          </div>
        </div>
      </ConfigContents>
      <div className='pc:w-full my-4 flex items-center justify-center space-x-2'>
        <ButtonSkeleton>초기화</ButtonSkeleton>
        <ButtonSkeleton>저장</ButtonSkeleton>
      </div>
    </ConfigContainer>
  );
};

export default PostConfigFormSkeleton;
