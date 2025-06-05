import Skeleton from '@/shared/ui/skeleton/Skeleton';

const ProjectCrewsSkeleton = () => {
  return (
    <section className='w-full flex flex-col items-center px-1'>
      <section className='w-full mobile:max-h-[400px] mx-auto  mobile:overflow-y-scroll'>
        <ul role='list' className='w-full space-y-2'>
          <Skeleton className='h-[70px]' />
          <Skeleton className='h-[70px]' />
          <Skeleton className='h-[70px]' />
          <Skeleton className='h-[70px]' />
          <Skeleton className='h-[70px]' />
        </ul>
      </section>
    </section>
  );
};

export default ProjectCrewsSkeleton;
