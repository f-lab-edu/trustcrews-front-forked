'use client';

import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
  activeMainBoardTabStore,
  MAIN_BOARD_TABS,
} from '@/store/ActiveMainBoardTabStateStore';
import MyProjectApplies from '@/features/myProjectApplies/components/MyProjectApplies';
import { useEffect } from 'react';
import CardListSkeleton from '@/shared/ui/skeleton/CardListSkeleton';
import { ITEM_COUNT_PER_PAGE } from '@/constants/pagination';
import MyProjects from '@/features/myProjects/components/MyProjects';
import Posts from '@/features/posts/components/Posts';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';
import PostsSkeleton from '@/features/posts/components/PostsSkeleton';
import { AuthState, authStateStore } from '@/store/AuthStateStore';
import useSyncAuthState from '@/hooks/useSyncAuthState';
import { clsx } from 'clsx';

const {
  BM_TAB001: { code: POSTS_TAB },
  BM_TAB002: { code: MANAGE_PROJECT_TAB },
} = MAIN_BOARD_TABS;

type MainBoardProps = {
  serverAuthState: AuthState;
};

const MainBoard = ({ serverAuthState }: MainBoardProps) => {
  const resetActiveBoardTab = useResetRecoilState(activeMainBoardTabStore);
  const [activeMainBoardTab, setActiveMainBoardTab] = useRecoilState(
    activeMainBoardTabStore,
  );

  useEffect(() => {
    resetActiveBoardTab();
  }, [resetActiveBoardTab]);

  const handleClickMainBoardTab = (tabName: string) => {
    setActiveMainBoardTab(tabName);
  };

  const { isAuthSync } = useSyncAuthState(serverAuthState);
  const { isAuthorized } = useRecoilValue(authStateStore);

  return (
    <>
      <div role='tablist' aria-label='게시판' className='flex border-b'>
        {Object.values(MAIN_BOARD_TABS).map(({ desc, code }) => (
          <div
            key={`tab-${code}`}
            role='tab'
            id={`tab-${code}`}
            aria-selected={activeMainBoardTab === code}
            aria-controls={`panel-${code}`}
            tabIndex={activeMainBoardTab === code ? 0 : -1}
            className={clsx(
              'p-5 font-bold text-2xl cursor-pointer mobile:text-xl',
              activeMainBoardTab === code
                ? 'border-b-2 border-black100 text-black100'
                : 'text-greyUnselect',
            )}
            onClick={() => handleClickMainBoardTab(code)}
          >
            {desc}
          </div>
        ))}
      </div>
      <section>
        <div
          role='tabpanel'
          id={`panel-${MANAGE_PROJECT_TAB}`}
          tabIndex={0}
          aria-labelledby={`tab-${MANAGE_PROJECT_TAB}`}
        >
          {activeMainBoardTab === MANAGE_PROJECT_TAB && (
            <>
              {isAuthorized && <MyProjectApplies />}
              <FieldQueryBoundary
                errorFallbackSize='lg'
                suspenseFallback={
                  <CardListSkeleton itemCount={ITEM_COUNT_PER_PAGE.CARDS} />
                }
              >
                {isAuthSync ? (
                  isAuthorized ? (
                    <MyProjects />
                  ) : (
                    <div className='mt-12 mobile:mt-6 flex items-center justify-center w-full h-[260px] bg-ground100 text-center rounded-md my-5'>
                      <p className='py-10 mobile:text-2xl tablet:text-3xl pc:text-4xl font-medium text-grey900 px-3'>
                        로그인이 필요합니다.
                      </p>
                    </div>
                  )
                ) : (
                  <CardListSkeleton itemCount={ITEM_COUNT_PER_PAGE.CARDS} />
                )}
              </FieldQueryBoundary>
            </>
          )}
        </div>
        <div
          role='tabpanel'
          id={`panel-${POSTS_TAB}`}
          tabIndex={0}
          aria-labelledby={`tab-${POSTS_TAB}`}
        >
          {activeMainBoardTab === POSTS_TAB && (
            <FieldQueryBoundary
              errorFallbackSize='lg'
              suspenseFallback={<PostsSkeleton />}
            >
              <Posts />
            </FieldQueryBoundary>
          )}
        </div>
      </section>
    </>
  );
};

export default MainBoard;
