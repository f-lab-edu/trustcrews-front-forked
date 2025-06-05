import Skeleton from '@/shared/ui/skeleton/Skeleton';

const PMAuthSkeleton = () => {
  return (
    <div className='mx-auto mt-8 flow-root'>
      <div className='-ml-4 -my-2 overflow-x-auto sm:-ml-6 lg:-ml-12'>
        <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
          <div className='w-full py-5 pl-4'>
            <Skeleton className='w-full h-[50px]' />
          </div>
          <div className='w-full py-5 pl-4'>
            <Skeleton className='w-full h-[50px]' />
          </div>
          <div className='w-full py-5 pl-4'>
            <Skeleton className='w-full h-[50px]' />
          </div>
          <div className='w-full py-5 pl-4'>
            <Skeleton className='w-full h-[50px]' />
          </div>
          <div className='w-full py-5 pl-4'>
            <Skeleton className='w-full h-[50px]' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PMAuthSkeleton;
