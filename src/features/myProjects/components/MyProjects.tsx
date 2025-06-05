'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';
import CommonPagination from '@/shared/ui/CommonPagination';
import { ITEM_COUNT_PER_PAGE, PAGE_RANGE } from '@/constants/pagination';
import { useMyProjects } from '@/features/myProjects/api/getMyProjects';

const MyProjects = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const {
    data: {
      data: { content, totalPages },
    },
  } = useMyProjects(pageNumber);

  if (totalPages === 0)
    return (
      <div className='flex items-center justify-center w-full h-[260px] bg-ground100 text-center rounded-md my-5'>
        <p className='py-10 mobile:text-2xl tablet:text-3xl font-medium text-grey900 px-3'>
          참여하고 있는 프로젝트가 없습니다.
        </p>
      </div>
    );

  const handleChangePage = (pageNumber: number) => {
    setPageNumber(pageNumber - 1);
  };

  return (
    <section className='my-10'>
      <h2 className='sr-only'>참여 프로젝트</h2>
      <ul className='grid justify-items-center pc:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 mt-8 mobile:mt-2 gap-10'>
        {content.map((v) => (
          <li
            key={v.projectId}
            className='flex-col w-[280px] max-h-[330px] rounded-xl border-2 shadow-lg mobile:bg-white mobile:w-full mobile:mt-2'
          >
            <ProjectCard projectPost={v} />
          </li>
        ))}
      </ul>
      <CommonPagination
        activePage={pageNumber + 1}
        itemsCountPerPage={ITEM_COUNT_PER_PAGE.CARDS}
        totalItemsCount={totalPages}
        pageRangeDisplayed={PAGE_RANGE.DEFAULT}
        onChange={handleChangePage}
      />
    </section>
  );
};

export default MyProjects;
