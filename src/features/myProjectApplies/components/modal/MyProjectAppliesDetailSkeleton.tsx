import { ITEM_COUNT_PER_PAGE } from '@/constants/pagination';
import Skeleton from '@/shared/ui/skeleton/Skeleton';

const MyProjectAppliesDetailSkeleton = () => {
  return (
    <div className='w-[470px] max-h-[300px] overflow-y-auto divide-y divide-gray-100 px-2 py-5 space-y-4 mobile:w-[340px]'>
      {Array.from({ length: ITEM_COUNT_PER_PAGE.LIST_SM }).map((_, index) => (
        <Skeleton key={`skeleton-${index}`} className='w-full h-10' />
      ))}
    </div>
  );
};

export default MyProjectAppliesDetailSkeleton;
