'use client';

import { useRouter } from 'next/navigation';
import Avatar from '@/shared/ui/Avatar';
import Button from '@/shared/ui/Button';
import TechStackBadge from '@/features/techStack/components/TechStackBadge';
import { useUserDetailInfo } from '@/features/userProfile/api/getUserDetailInfo';

const UserProfile = () => {
  const router = useRouter();
  const {
    data: { data: profileInfo },
  } = useUserDetailInfo();

  const { nickname, profileImgSrc, position, techStacks, intro } = profileInfo;

  return (
    <div className='rounded-lg border-2 border-gray-200 bg-white mt-3 mobile:mt-2 px-2'>
      <div className='w-full h-fit text-center my-6 mobile:my-4'>
        <Avatar
          size='md'
          src={profileImgSrc || ''}
          alt='사용자 아바타 이미지'
          className='mt-1 mb-2'
        />
        <div className='max-w-[300px] mx-auto space-y-1 mb-2'>
          <p className='text-xl mobile:text-lg'>{nickname}</p>
          <p className='text-lg mobile:text-base text-grey700'>
            {position.positionName}
          </p>
          <p className='mobile:text-xs text-grey500'>{intro}</p>
        </div>
        <div className='mb-2'>
          {techStacks.length > 0 &&
            techStacks.map((stack) => (
              <TechStackBadge
                key={stack.techStackId}
                size='sm'
                text={stack.techStackName}
                className='mx-0.5 justify-center'
              />
            ))}
        </div>
        <div className='pt-3 mobile:pt-2'>
          <Button
            size='md'
            theme='primaryHollow'
            onClick={() => router.push('/user/update')}
          >
            프로필 수정
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
