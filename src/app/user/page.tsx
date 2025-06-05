'use client';

import dynamic from 'next/dynamic';
import UserProfileSkeleton from '@/features/userProfile/components/UserProfileSkeleton';
import UserTrustScoreSkeleton from '@/features/userProfile/components/userTrustScore/UserTrustScoreSkeleton';
import UserProjectHistorySkeleton from '@/features/userProfile/components/userProjectHistory/UserProjectHistorySkeleton';

const MyProjectHistory = dynamic(
  () =>
    import(
      '@/features/userProfile/components/userProjectHistory/UserProjectHistory'
    ),
  { ssr: false, loading: () => <UserProjectHistorySkeleton /> },
);

const UserProfile = dynamic(
  () => import('@/features/userProfile/components/UserProfile'),
  { ssr: false, loading: () => <UserProfileSkeleton /> },
);

const UserTrustScore = dynamic(
  () =>
    import('@/features/userProfile/components/userTrustScore/UserTrustScore'),
  { ssr: false, loading: () => <UserTrustScoreSkeleton /> },
);

const UserPage = () => {
  return (
    <>
      <UserProfile />
      <UserTrustScore />
      <MyProjectHistory />
    </>
  );
};

export default UserPage;
