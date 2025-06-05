import AvatarSkeleton from '@/shared/ui/skeleton/AvatarSkeleton';
import Skeleton from '@/shared/ui/skeleton/Skeleton';

const UserImageFormSkeleton = () => {
  return (
    <div className='my-5 mobile:my-3'>
      <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3'>
        <div className='w-full h-fit text-center'>
          <AvatarSkeleton size='lg' className='relative inline-block' />
        </div>
        <div className='text-center space-x-1'>
          <Skeleton className='max-w-[65px] m-auto h-10 mobile:h-6 rounded-full' />
        </div>
      </div>
    </div>
  );
};

export default UserImageFormSkeleton;
