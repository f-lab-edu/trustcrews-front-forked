import GuideNavLink from '@/features/guide/components/GuideNavLink';

const Guide = () => {
  return (
    <section className='w-full pc:h-[310px] mobile:h-[200px] flex flex-col justify-center items-start px-[120px] py-[25px] tablet:px-[60px] mobile:px-5 my-5 bg-emerald-500/10 rounded-3xl'>
      <h1
        tabIndex={0}
        aria-label='TRUSTCREWS: 성실한 팀원들과의 사이드 프로젝트'
        className='text-secondary'
      >
        <div
          aria-hidden={true}
          className='flex mobile:flex-col items-center mobile:items-start space-x-4 mobile:space-x-0 my-10 mobile:my-5 divide-x-2 divide-current'
        >
          <span className='text-4xl mobile:text-xl font-bold'>TRUSTCREWS</span>
          <span className='px-4 text-2xl mobile:text-sm font-semibold self-baseline'>
            책임감 있는 사이드 프로젝트 팀, 팀원을 구하는 방법
          </span>
        </div>
      </h1>
      <span
        id='ally-userGuide'
        aria-hidden={true}
        className='inline-block py-[2px] px-6 text-lg mobile:text-sm font-semibold text-white bg-teal-400/70 self-start rounded-full'
      >
        이용안내
      </span>
      <nav aria-labelledby='ally-userGuide'>
        <ul
          role='none'
          className='flex flex-wrap pc:h-[50px] items-center py-4'
        >
          <GuideNavLink href='https://www.notion.so/eunsunkim/103ddc74b8648090aee4e3a385cea5c2?pvs=4'>
            프로젝트 시작하기
          </GuideNavLink>
          <GuideNavLink href='https://www.notion.so/eunsunkim/17b9f99de14d4bc2b54ed8057ae95faf?pvs=4'>
            프로젝트 참여하기
          </GuideNavLink>
          <GuideNavLink href='https://www.notion.so/eunsunkim/104ddc74b86480b6ae0ee50670d21691?pvs=4'>
            신뢰 레벨 시스템
          </GuideNavLink>
        </ul>
      </nav>
    </section>
  );
};

export default Guide;
