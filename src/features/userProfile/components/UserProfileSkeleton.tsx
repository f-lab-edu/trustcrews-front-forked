import AvatarSkeleton from '@/shared/ui/skeleton/AvatarSkeleton';
import Skeleton from '@/shared/ui/skeleton/Skeleton';

const UserProfileSkeleton = () => {
  return (
    <div className='rounded-lg border-2 border-gray-200 bg-white mt-3 mobile:mt-2 px-2'>
      <div className='flex flex-col items-center w-full h-fit text-center my-6 mobile:my-4'>
        <AvatarSkeleton size='md' className='mt-1 mb-2 relative inline-block' />
        <div className='flex flex-col items-center max-w-[300px] m-auto space-y-2'>
          <Skeleton className='w-[100px] h-[30px] mobile:w-[90px] mobile:h-[32px] rounded-lg' />
          <Skeleton className='w-[90px] h-[27px] mobile:w-[80px] mobile:h-[23px] rounded-lg' />
          <Skeleton className='w-[200px] h-[22px] mobile:w-[130px] mobile:h-[18px] rounded-md' />
          <div className='flex items-center justify-center space-x-1'>
            <Skeleton className='w-[70px] h-[30px] mobile:w-[60px] mobile:h-[26px] rounded-full' />
            <Skeleton className='w-[70px] h-[30px] mobile:w-[60px] mobile:h-[26px] rounded-full' />
            <Skeleton className='w-[70px] h-[30px] mobile:w-[60px] mobile:h-[26px] rounded-full' />
            <Skeleton className='w-[70px] h-[30px] mobile:w-[60px] mobile:h-[26px] rounded-full' />
          </div>
        </div>
        <Skeleton className='w-[100px] h-[40px] mobile:w-[80px] mobile:h-[30px] rounded-full mt-4' />
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
