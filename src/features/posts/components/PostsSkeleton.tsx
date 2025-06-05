import TechStackFilterSkeleton from '@/features/posts/components/techStackFilter/TeckStackFilterSkeleton';
import CardListSkeleton from '@/shared/ui/skeleton/CardListSkeleton';
import Skeleton from '@/shared/ui/skeleton/Skeleton';
import PositionFilterSkeleton from '@/features/posts/components/positionFilter/PositionFilterSkeleton';

const PostsSkeleton = () => {
  return (
    <section className='flex flex-col space-y-5'>
      <h2 className='sr-only'>팀 프로젝트</h2>
      <section
        aria-label='게시글 검색'
        className='mt-6 flex  mobile:block mobile:space-y-5'
      >
        <div className='flex justify-start space-x-5 mr-auto'>
          <TechStackFilterSkeleton />
          <PositionFilterSkeleton />
        </div>
        <Skeleton className='w-[230px] h-[40px]' />
      </section>
      <section className='mt-6 mobile:mt-2'>
        <CardListSkeleton itemCount={8} />
      </section>
    </section>
  );
};

export default PostsSkeleton;
