import Skeleton from '@/shared/ui/skeleton/Skeleton';

const UserProjectHistorySkeleton = () => {
  return (
    <div className='p-3 mobile:p-0 mobile:pt-3 space-y-5'>
      <h3 className='tablet:text-[26px] mobile:text-lg font-semibold text-greyDarkBlue my-10 mobile:my-5'>
        프로젝트 이력
      </h3>
      <div className='flex-col space-y-4 mobile:space-y-2'>
        <Skeleton sizeClassName='w-full h-12' />
        <Skeleton sizeClassName='w-full h-12' />
        <Skeleton sizeClassName='w-full h-12' />
        <Skeleton sizeClassName='w-full h-12' />
        <Skeleton sizeClassName='w-full h-12' />
      </div>
    </div>
  );
};

export default UserProjectHistorySkeleton;
