import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import ButtonSkeleton from '@/shared/ui/skeleton/ButtonSkeleton';
import Skeleton from '@/shared/ui/skeleton/Skeleton';
import { useMediaQuery } from 'react-responsive';
import SquareSkeleton from '@/shared/ui/skeleton/SquareSkeleton';
import BadgeStyleSkeleton from '@/shared/ui/skeleton/BadgeStyleSkeleton';
import TasksSkeleton from '@/features/projectDetail/job/components/task/TasksSkeleton';

const ProjectJobSkeleton = () => {
  const mobile = useMediaQuery({ maxWidth: 700 });

  const milestoneCount = mobile ? 1 : 3;

  return (
    <section className='w-full flex flex-col items-start'>
      <ButtonSkeleton size='md' className='mb-4'>
        <span className='flex items-center'>
          <FaPlus className='tablet:w-3 tablet:h-3 mr-2' />
          마일스톤 추가
        </span>
      </ButtonSkeleton>
      <ul className='w-full tablet:mt-8 mobile:mt-6 grid justify-items-center pc:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-4 mobile:gap-0'>
        {Array(milestoneCount)
          .fill(null)
          .map((_, idex) => (
            <li key={idex}>
              <Skeleton className='pc:w-[274px] tablet:w-[180px] mobile:w-[274px] h-[98px] py-4'></Skeleton>
            </li>
          ))}
      </ul>
      <div className='my-10 w-full flex items-center justify-center space-x-2 '>
        <span className='w-[8px] h-[8px] rounded-full bg-gray-200 animate-pulse'></span>
        <span className='w-[8px] h-[8px] rounded-full bg-gray-200 animate-pulse'></span>
      </div>
      <section className='w-full flex flex-col items-start'>
        <div className='w-full flex items-center justify-start mb-4'>
          <ButtonSkeleton>+ 업무 추가</ButtonSkeleton>
          <div className='ml-4 mr-auto flex items-center space-x-3'>
            <SquareSkeleton className='my-2 tablet:text-3xl text-transparent'>
              마일스톤제목
            </SquareSkeleton>
            <BadgeStyleSkeleton text='시작전' size='md' />
            <div className='flex items-center space-x-3 tablet:text-xl text-transparent'>
              <SquareSkeleton>yyyy-mm-dd</SquareSkeleton>
              <SquareSkeleton>yyyy-mm-dd</SquareSkeleton>
            </div>
          </div>
        </div>
        <TasksSkeleton />
      </section>
    </section>
  );
};

export default ProjectJobSkeleton;
