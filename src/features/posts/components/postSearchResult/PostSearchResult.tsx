import PostCard from '@/features/posts/components/postSearchResult/PostCard';
import CommonPagination from '@/shared/ui/CommonPagination';
import { ITEM_COUNT_PER_PAGE, PAGE_RANGE } from '@/constants/pagination';
import { usePostList } from '@/features/posts/api/getPostList';
import { useRecoilValue } from 'recoil';
import {
  postSearchValue,
  selectedPositionState,
} from '@/store/posts/PostSearchStateStore';
import { useState } from 'react';
import { selectedTechStackState } from '@/store/posts/filter/TechStackFilterStateStore';

const PostSearchResult = () => {
  const selectedTechStacks = useRecoilValue(selectedTechStackState);
  const { value: selectedPosition } = useRecoilValue(selectedPositionState);
  const searchValue = useRecoilValue(postSearchValue);
  const [pageNumber, setPageNumber] = useState(0);

  const {
    data: {
      data: { content: infos, totalPages: totalItemsCount },
    },
  } = usePostList({
    techStacks: selectedTechStacks,
    position: selectedPosition,
    keyword: searchValue,
    page: pageNumber,
  });

  return totalItemsCount === 0 ? (
    <div className='flex items-center justify-center w-full h-[280px] bg-ground100 text-center rounded-md'>
      <p className='py-10 mobile:text-2xl tablet:text-3xl font-medium text-grey900'>
        게시글이 존재하지 않습니다.
      </p>
    </div>
  ) : (
    <>
      <ul
        role='list'
        className='grid justify-items-center pc:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 mt-8 mobile:mt-2 gap-10 mobile:gap-5 '
      >
        {infos.map((info) => (
          <li
            key={info.postId.toString()}
            className='flex-col w-[280px] max-h-[330px] rounded-xl border-2 shadow-lg mobile:w-full mobile:mt-2'
          >
            <PostCard key={info.postId.toString()} postInfo={info} />
          </li>
        ))}
      </ul>
      <CommonPagination
        activePage={pageNumber + 1}
        itemsCountPerPage={ITEM_COUNT_PER_PAGE.CARDS}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={PAGE_RANGE.DEFAULT}
        onChange={(page) => setPageNumber(page - 1)}
      />
    </>
  );
};

export default PostSearchResult;
