'use client';

import { useRef } from 'react';
import Loader from '@/shared/ui/Loader';
import useIntersectionObserver from '@/shared/hooks/useIntersectionObserver';
import Badge from '@/shared/ui/Badge';
import { useMyProjectApplies } from '@/features/myProjectApplies/api/getMyProjectApplies';
import { ProjectApplyStatusBadge } from '@/features/myProjectApplies/components/ProjectApplyStatusBadge';

const MyProjectAppliesDetail = () => {
  const bottomRef = useRef<HTMLLIElement | null>(null);
  const rootRef = useRef<HTMLUListElement | null>(null);

  const {
    data: { pages },
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useMyProjectApplies();

  useIntersectionObserver({
    target: bottomRef,
    root: rootRef,
    onIntersectHandler: (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !isFetchingNextPage) fetchNextPage();
    },
  });

  const totalItemCount = pages[0].data.totalPages;

  return (
    <ul
      role='list'
      className='min-w-[300px] max-h-[300px] overflow-y-auto divide-y divide-gray-100'
      ref={rootRef}
    >
      {totalItemCount > 0 ? (
        pages.map(({ data: { content } }) => {
          return content.map(
            ({
              project_apply_id,
              project_name,
              position_name,
              status: { code: statusCode, name: statusName },
            }) => (
              <li
                key={`projectApply-${project_apply_id}`}
                className='flex items-center justify-between gap-x-6 w-full px-2 py-5'
              >
                <div className='mobile:w-[320px] tablet:w-[450px] flex items-center justify-between'>
                  <div className='min-w-0'>
                    <div className='flex items-center gap-x-3'>
                      <p className='mobile:text-sm tablet:text-xl font-semibold leading-6 text-gray-900'>
                        {project_name}
                      </p>
                      <Badge text={position_name} size='sm' />
                    </div>
                  </div>
                  <div className='flex flex-none items-center'>
                    <ProjectApplyStatusBadge applyStatus={statusCode}>
                      {statusName}
                    </ProjectApplyStatusBadge>
                  </div>
                </div>
              </li>
            ),
          );
        })
      ) : (
        <li className='flex items-center justify-center mobile:w-[320px] tablet:w-[450px] h-[150px] bg-gray-100 rounded-md'>
          <div className='text-xl text-center text-gray-600/80'>
            지원한 프로젝트가 없습니다.
          </div>
        </li>
      )}
      {hasNextPage && (
        <li
          ref={bottomRef}
          className='border border-red flex items-center w-full h-[80px]'
        >
          <Loader size='sm' />
        </li>
      )}
    </ul>
  );
};

export default MyProjectAppliesDetail;
