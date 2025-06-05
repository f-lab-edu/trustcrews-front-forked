import Skeleton from '@/shared/ui/skeleton/Skeleton';
import { ITEM_COUNT_PER_PAGE } from '@/constants/pagination';

const TasksSkeleton = () => {
  const items = new Array(ITEM_COUNT_PER_PAGE.CARDS_SM).fill(null);
  return (
    <div className='grid justify-items-center mt-4 mobile:mt-2 pc:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-10 mobile:gap-0'>
      {items.length > 0 &&
        items.map((_, idx) => (
          <Skeleton
            key={idx}
            className='flex-col w-[330px] h-[275px] rounded-xl mobile:w-full mobile:rounded-none mobile:mt-2'
          />
        ))}
    </div>
  );
};

export default TasksSkeleton;
