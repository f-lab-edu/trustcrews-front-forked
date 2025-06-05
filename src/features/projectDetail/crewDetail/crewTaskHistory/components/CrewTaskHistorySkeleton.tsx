import Skeleton from '@/shared/ui/skeleton/Skeleton';

const CrewTaskHistorySkeleton = () => {
  return (
    <div className='h-[280px] flow-root tablet:mt-10 mobile:mt-8 mb-8 mx-2'>
      {
        <ul role='list' className='-mb-8 ml-3 flex-column space-y-1'>
          <li className='w-full h-[60px] flex justify-between space-x-12 mobile:space-x-8 items-center pb-8'>
            <Skeleton className='w-[100px] mobile:w-[80px] h-full' />
            <Skeleton className='flex-grow h-full' />
          </li>
          <li className='w-full h-[60px] flex justify-between space-x-12 mobile:space-x-8 items-center pb-8'>
            <Skeleton className='w-[100px] mobile:w-[80px] h-full' />
            <Skeleton className='flex-grow h-full' />
          </li>
          <li className='w-full h-[60px] flex justify-between space-x-12 mobile:space-x-8 items-center pb-8'>
            <Skeleton className='w-[100px] mobile:w-[80px] h-full' />
            <Skeleton className='flex-grow h-full' />
          </li>
          <li className='w-full h-[60px] flex justify-between space-x-12 mobile:space-x-8 items-center pb-8'>
            <Skeleton className='w-[100px] mobile:w-[80px] h-full' />
            <Skeleton className='flex-grow h-full' />
          </li>
        </ul>
      }
    </div>
  );
};

export default CrewTaskHistorySkeleton;
