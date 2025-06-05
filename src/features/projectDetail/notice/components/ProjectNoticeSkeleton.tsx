import ContentsLoader from '@/shared/ui/ContentsLoader';
import { NOTICE_TABS } from '@/constants/data/projectDetail/notice/noticeTabs';
import Skeleton from '@/shared/ui/skeleton/Skeleton';

export const ProjectNoticeSkeleton = () => {
  return (
    <section className='tablet:flex tablet:space-x-16 pc:space-x-24 pc:max-w-[1000px] tablet:max-w-[700px] mx-3'>
      <nav
        className='flex flex-1 flex-col tablet:max-w-[10rem] mobile:mb-8'
        aria-label='Sidebar'
      >
        <ul role='list' className='mobile:hidden tablet:-mx-2 tablet:space-y-1'>
          {Object.values(NOTICE_TABS).map((v) => (
            <li key={`navTabSkeleton-${v.code}`}>
              <Skeleton>{v.name}</Skeleton>
            </li>
          ))}
        </ul>
        <div className='mobile:block hidden'>
          <Skeleton className='w-[80px] h-[35px]' />
        </div>
      </nav>
      <section className='mb-20 tablet:basis-4/5'>
        <ContentsLoader />
      </section>
    </section>
  );
};
