'use client';

import TitleFilter from '@/features/posts/components/titleFilter/TitleFilter';
import TechStackFilter from '@/features/posts/components/techStackFilter/TechStackFilter';
import PositionFilter from '@/features/posts/components/positionFilter/PositionFilter';
import PostSearchResult from '@/features/posts/components/postSearchResult/PostSearchResult';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';
import CardListSkeleton from '@/shared/ui/skeleton/CardListSkeleton';

const Posts = () => {
  return (
    <section className='flex flex-col space-y-5'>
      <h2 className='sr-only'>팀 프로젝트</h2>
      <section
        aria-label='게시글 검색'
        className='mt-6 flex justify-start mobile:block mobile:space-y-5'
      >
        <div className='flex justify-start space-x-5 mr-auto'>
          <TechStackFilter />
          <PositionFilter />
        </div>
        <TitleFilter />
      </section>
      <section className='mt-6 mobile:mt-2'>
        <FieldQueryBoundary
          errorFallbackSize='lg'
          suspenseFallback={<CardListSkeleton itemCount={8} />}
        >
          <PostSearchResult />
        </FieldQueryBoundary>
      </section>
    </section>
  );
};

export default Posts;
