import AvatarSkeleton from '@/shared/ui/skeleton/AvatarSkeleton';
import BadgeStyleSkeleton from '@/shared/ui/skeleton/BadgeStyleSkeleton';
import ButtonSkeleton from '@/shared/ui/skeleton/ButtonSkeleton';
import Skeleton from '@/shared/ui/skeleton/Skeleton';

const CrewProfileSkeleton = () => {
  return (
    <div className='flex mobile:flex-col mobile:space-y-6 mobile:mt-4 px-1 py-4 mx-auto items-center justify-center '>
      <section className='mobile:w-full pc:w-[200px] tablet:w-[150px] tablet:mr-10 flex flex-col items-center space-y-5'>
        <AvatarSkeleton size='md' />
        <Skeleton className='w-[120px] h-[35px] my-1' />
        <ButtonSkeleton
          size='lg'
          className='w-[160px] h-[40px] mobile:w-[120px] mobile:h-[40px] my-3 '
        />
      </section>
      <section className='mobile:w-full tablet:h-[220px] mobile:h-[180px] flex flex-col flex-wrap justify-between p-6 mobile:p-4 bg-ground100 rounded-lg'>
        <div className='pc:h-[50px] tablet:mx-8 flex items-center justify-around mobile:space-x-4'>
          <span className='tablet:w-[200px] pc:text-2xl tablet:text-[1.3rem] font-medium text-geryDarkBlue'>
            프로젝트 권한
          </span>
          <span className='min-w-[100px] flex justify-center grow-0 mx-auto'>
            <BadgeStyleSkeleton size='md' />
          </span>
        </div>
        <div className='pc:h-[50px] tablet:mx-8 flex items-center justify-around mobile:space-x-4'>
          <span className='tablet:w-[200px] pc:text-2xl tablet:text-[1.2rem] font-medium text-geryDarkBlue'>
            프로젝트 포지션
          </span>
          <span className='min-w-[100px] flex justify-center grow-0 mx-auto'>
            <BadgeStyleSkeleton size='md' />
          </span>
        </div>
        <div className='pc:h-[50px] tablet:mx-8 flex items-center justify-around mobile:space-x-4'>
          <span className='tablet:w-[200px] pc:text-2xl tablet:text-[1.2rem] font-medium text-geryDarkBlue'>
            기술스택
          </span>
          <span className='min-w-[100px] flex justify-center grow-0 mx-auto text-center tablet:text-lg font-medium text-greyBlue'>
            <BadgeStyleSkeleton size='md' />
          </span>
        </div>
        <div className='pc:h-[50px] tablet:mx-8 flex items-center justify-around mobile:space-x-4'>
          <span className='tablet:w-[200px] pc:text-2xl tablet:text-[1.2rem] font-medium text-geryDarkBlue'>
            신뢰점수
          </span>
          <span className='min-w-[100px] flex justify-center grow-0 mx-auto text-center tablet:text-lg font-medium text-greyBlue'>
            <BadgeStyleSkeleton size='md' />
          </span>
        </div>
      </section>
    </div>
  );
};

export default CrewProfileSkeleton;
