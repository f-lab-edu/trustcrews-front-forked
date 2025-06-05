import Link from 'next/link';
import TrustGradeBadge from '@/features/trustGrade/components/TrustGradeBadge';
import Badge from '@/shared/ui/Badge';
import TechStackImage from '@/features/techStack/components/TechStackImage';
import Avatar from '@/shared/ui/Avatar';
import { format } from 'date-fns';
import { FaPlusCircle } from '@react-icons/all-files/fa/FaPlusCircle';
import { PostInfoSummary } from '@/features/posts/api/getPostList';

const PostCard = ({ postInfo }: { postInfo: PostInfoSummary }) => {
  const {
    postId,
    title,
    project: {
      projectName,
      startDate,
      endDate,
      projectSubject,
      technologyStacks,
    },
    postPositions,
    user: { profileImgSrc, nickname, trustGrade },
  } = postInfo;

  return (
    <div className='p-4'>
      <Link aria-label={`${title}로 가기`} href={`/post/${postId}`}>
        <article>
          <h3 className='text-xl font-bold  truncate mb-1'>{title}</h3>
          <section className='mt-4 mb-2 flex items-center text-base text-gray-600 font-medium'>
            <h4 className='basis-[50px] text-gray-500 font-semibold'>기간</h4>
            <article>
              <h5 className='sr-only'>시작날짜:</h5>
              <time
                className='inline-block mr-1 '
                dateTime={`${format(new Date(startDate), 'yyyy-MM-dd')}`}
              >
                {`${format(new Date(startDate), 'yyyy-MM-dd')}`}
              </time>
              <span aria-hidden={true} className='text-sm'>
                &#126;
              </span>
              <h5 className='sr-only'>종료날짜:</h5>
              <time
                className='inline-block ml-1'
                dateTime={`${format(new Date(endDate), 'yyyy-MM-dd')}`}
              >
                {format(new Date(endDate), 'yyyy-MM-dd')}
              </time>
            </article>
          </section>
          <section className='flex my-2'>
            <h4 className='basis-[50px] text-base text-gray-500 font-semibold'>
              팀명
            </h4>
            <p className='inline-block max-w-[100px] mr-3 font-bold text-lg truncate'>
              {projectName}
            </p>
          </section>
          <section className='relative my-2 flex items-start'>
            <h4 className='basis-[50px] text-base text-gray-500 font-semibold'>
              주제
            </h4>
            <article className='group'>
              <p className='max-w-[180px] truncate text-lg font-semibold'>
                {projectSubject}
              </p>
              <div
                role='tooltip'
                aria-hidden={true}
                id='tooltip-subject'
                className='customTooltip group-hover:visible'
              >
                {projectSubject}
              </div>
            </article>
          </section>
          {postPositions.length > 0 && (
            <section>
              <h4 id={`recruit-card-position-${postId}`} className='sr-only'>
                모집 포지션
              </h4>
              <article className='flex items-center gap-2 mt-5'>
                <ul
                  aria-labelledby='recruit-card-position'
                  className='basis-[200px] mobile:basis-[180px] flex items-center'
                >
                  {postPositions
                    .slice(0, 3)
                    .map(({ position: { positionId, positionName } }) => (
                      <li key={positionId.toString()}>
                        <Badge
                          key={positionId.toString()}
                          size='xs'
                          text={positionName}
                        />
                      </li>
                    ))}
                </ul>
                {postPositions.length > 3 && (
                  <div className='flex items-center space-x-2'>
                    <div>
                      <span className='sr-only'>외 </span>
                      <FaPlusCircle aria-hidden={true} />
                    </div>
                    <div className='pt-1 leading-none text-greyDarkblue/80 font-semibold'>
                      {postPositions.length - 3}
                      <span className='sr-only'>개</span>
                    </div>
                  </div>
                )}
              </article>
            </section>
          )}
          {technologyStacks.length > 0 && (
            <section className='flex items-center gap-2 border-b-2 pb-4 mt-3 '>
              <h4 id='recruit-card-techstack' className='sr-only'>
                사용 기술스택
              </h4>
              <ul
                aria-labelledby='recruit-card-techstack'
                className='flex items-center space-x-1 basis-[180px]'
              >
                {technologyStacks
                  .slice(0, 5)
                  .map(({ techStackId, techStackName }) => (
                    <li key={techStackId}>
                      <TechStackImage
                        key={techStackId}
                        stackName={techStackName}
                        width={30}
                        height={30}
                      />
                      <span className='sr-only'>{techStackName}</span>
                    </li>
                  ))}
              </ul>
              {technologyStacks.length > 5 && (
                <div className='flex items-center space-x-2'>
                  <div>
                    <span className='sr-only'>외 </span>
                    <FaPlusCircle aria-hidden={true} />
                  </div>
                  <div className='pt-1 leading-none text-greyDarkblue/80 font-semibold'>
                    {technologyStacks.length - 5}
                    <span className='sr-only'>개</span>
                  </div>
                </div>
              )}
            </section>
          )}
          <footer className='flex items-center pt-3 px-1 justify-between'>
            <section>
              <h4 className='sr-only'>게시글 작성자</h4>
              <article className='flex items-center'>
                <Avatar
                  size='xxs'
                  alt='게시글 작성자 아바타 이미지'
                  src={profileImgSrc || ''}
                />
                <div className='flex items-center ml-2 text-sm'>
                  <p className='leading-none self-end'>{nickname}</p>
                  <TrustGradeBadge
                    size='xs'
                    trustGrade={trustGrade.name}
                    className='ml-1'
                  />
                </div>
              </article>
            </section>
          </footer>
        </article>
      </Link>
    </div>
  );
};

export default PostCard;
