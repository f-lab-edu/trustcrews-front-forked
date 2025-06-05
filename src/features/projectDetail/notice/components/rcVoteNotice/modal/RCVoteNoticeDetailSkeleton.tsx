import AvatarSkeleton from '@/shared/ui/skeleton/AvatarSkeleton';
import Skeleton from '@/shared/ui/skeleton/Skeleton';

const RCVoteNoticeDetailSkeleton = () => {
  return (
    <section className='tablet:max-w-[400px] mx-auto pt-5 flex-col items-center border-t border-b border-grey300 '>
      <AvatarSkeleton size='sm' className='mx-auto' />
      <Skeleton className='w-[100px] h-[21px] my-2 mx-auto' />
      <Skeleton className='w-[80px] h-[21px] mx-auto' />
      <Skeleton className='w-[150px] h-[21px] mt-2 mx-auto' />
      <Skeleton className='w-[280px] h-[48px] mt-2 mx-auto' />
      <div className='mt-5 mb-7 flex items-center justify-center space-x-4'>
        <div className='flex flex-col px-3 border-r-2 border-grey300'>
          <span className='mb-2 text-md font-medium text-greyBlue'>
            프로젝트
          </span>
          <Skeleton className='w-[50px] h-[30px]' />
        </div>
        <div className='flex flex-col'>
          <span className='mb-2 text-md font-medium text-greyBlue'>
            신뢰등급
          </span>
          <Skeleton className='w-[50px] h-[30px]' />
        </div>
        <div className='flex flex-col pl-3 border-l-2 border-grey300'>
          <span className='mb-2 text-md font-medium text-greyBlue'>
            신뢰점수
          </span>
          <Skeleton className='w-[50px] h-[30px]' />
        </div>
      </div>
      <section className='tablet:max-w-[400px] h-[250px] mx-auto flex flex-col justify-center'>
        <Skeleton className='w-[80px] h-10 mx-auto' />
        <Skeleton className='w-[70%] h-6 mx-auto mt-2 mb-3' />
        <Skeleton className='w-[80%] h-[100px] mx-auto my-2' />
      </section>
    </section>
  );
};

export default RCVoteNoticeDetailSkeleton;
