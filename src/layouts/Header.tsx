'use client';

import Image from 'next/image';
import logo from '../../public/images/logo.png';
import Link from 'next/link';
import UserMenuSkeleton from '@/features/auth/userMenu/components/UserMenuSkeleton';
import { IoCreateOutline } from '@react-icons/all-files/io5/IoCreateOutline';
import dynamic from 'next/dynamic';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';
import { AuthState, authStateStore } from '@/store/AuthStateStore';
import useSyncAuthState from '@/hooks/useSyncAuthState';
import { useRecoilValue } from 'recoil';
import calcImageSizes from '@/lib/calcImageSizes';

const UserMenu = dynamic(
  () => import('@/features/auth/userMenu/components/UserMenu'),
  {
    ssr: false,
    loading: () => <UserMenuSkeleton />,
  },
);

type HeaderProps = {
  serverAuthState: AuthState;
};

const Header = ({ serverAuthState }: HeaderProps) => {
  const { isAuthSync } = useSyncAuthState(serverAuthState);
  const { isAuthorized } = useRecoilValue(authStateStore);

  return (
    <header className='flex flex-col'>
      <div className='flex items-center justify-between h-[80px] mobile:h-[65px] my-1'>
        <div id='top-navigation-wrap'>
          <Link
            href='/'
            aria-label='trustcrews 홈페이지'
            className='inline-block relative pc:w-[200px] pc:h-[60px] tablet:w-[150px] tablet:h-[50px] mobile:w-[120px] mobile:h-[40px]'
          >
            <Image
              src={logo}
              alt='trustcrew 대표 이미지'
              aria-hidden='true'
              sizes={calcImageSizes('120px', '150px', '200px')}
              fill
              style={{
                objectFit: 'cover',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-30%)',
              }}
              quality={100}
              priority
            />
          </Link>
        </div>
        <div id='top-navigation-main' className='flex items-center'>
          <Link href='/launch'>
            <div
              aria-hidden='true'
              className='mx-4 tablet:text-[20px] mobile:text-[16px] text-black100 font-semibold'
            >
              <span className='mobile:hidden'>새 프로젝트</span>
              <IoCreateOutline className='pc:hidden tablet:hidden h-6 w-6' />
            </div>
          </Link>
          <div>
            {isAuthSync ? (
              isAuthorized ? (
                <FieldQueryBoundary
                  isThrowingAllowed={false}
                  suspenseFallback={<UserMenuSkeleton />}
                >
                  <UserMenu />
                </FieldQueryBoundary>
              ) : (
                <Link
                  aria-label='로그인 페이지'
                  href='/login'
                  className='mx-2 tablet:text-[20px] mobile:text-[16px] text-black100 font-semibold'
                >
                  로그인
                </Link>
              )
            ) : (
              <UserMenuSkeleton />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
