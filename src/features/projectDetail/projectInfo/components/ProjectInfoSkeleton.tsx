'use client';

import Skeleton from '@/shared/ui/skeleton/Skeleton';

const PROJECT_INFO = ['기간', '주제', '기술스택'] as const;

const ProjectInfoSkeleton = () => {
  return (
    <section className='w-full min-h-[200px] tablet:flex mobile:flex-col items-center justify-start tablet:mt-[40px] mobile:mt-[10px] divide-x-2'>
      <div className='flex-col space-y-2 tablet:w-[460px] mobile:w-full pr-20'>
        <Skeleton sizeClassName='h-[50px] mobile:h-[36px]' />
      </div>
      <div className='h-full tablet:pl-20 mobile:p-1 mobile:mt-3 flex-col tablet:text-[1.25rem] mobile:text-[14px] font-semibold mobile:bg-ground200 mobile:rounded-md'>
        {PROJECT_INFO.map((info) => (
          <div key={info} aria-hidden={true} className='flex items-center my-3'>
            <div className='w-[5rem] mr-10 text-center text-grey800'>
              {info}
            </div>
            <Skeleton sizeClassName='w-[200px] h-[20px]'>
              데이터 로딩중
            </Skeleton>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectInfoSkeleton;
