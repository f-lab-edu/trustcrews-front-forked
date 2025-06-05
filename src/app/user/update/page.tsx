'use client';

import SaveUserProfileButton from '@/features/userProfileEditor/components/SaveUserProfileButton';
import UserImageFormSkeleton from '@/features/userProfileEditor/components/userImageForm/UserImageFormSkeleton';
import UserInfoFormSkeleton from '@/features/userProfileEditor/components/userInfoForm/UserInfoFormSkeleton';
import dynamic from 'next/dynamic';

const UserProfileImgForm = dynamic(
  () =>
    import(
      '@/features/userProfileEditor/components/userImageForm/UserImageForm'
    ),
  {
    ssr: false,
    loading: () => <UserImageFormSkeleton />,
  },
);

const UserInfoForm = dynamic(
  () =>
    import('@/features/userProfileEditor/components/userInfoForm/UserInfoForm'),
  { ssr: false, loading: () => <UserInfoFormSkeleton /> },
);

const UserUpdatePage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)]'>
      <div className='w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3'>
        <UserProfileImgForm />
        <UserInfoForm />
        <SaveUserProfileButton />
      </div>
    </div>
  );
};

export default UserUpdatePage;
