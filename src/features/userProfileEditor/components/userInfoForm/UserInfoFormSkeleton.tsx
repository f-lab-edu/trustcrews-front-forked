import Skeleton from '@/shared/ui/skeleton/Skeleton';

const UserInfoFormSkeleton = () => {
  return (
    <div className='my-5 mobile:my-3'>
      <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3'>
        <Skeleton className='w-full h-[55px] mobile:h-[60px]' />
        <Skeleton className='w-full h-[55px] mobile:h-[60px]' />
        <Skeleton className='w-full h-[55px] mobile:h-[60px]' />
        <Skeleton className='w-full h-[55px] mobile:h-[60px]' />
        <Skeleton className='w-full h-[120px] mobile:h-[105px]' />
        <Skeleton className='w-full h-[48px] mobile:h-[40px]' />
      </div>
    </div>
  );
};

export default UserInfoFormSkeleton;
