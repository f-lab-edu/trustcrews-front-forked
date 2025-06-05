'use client';

import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { cva } from 'class-variance-authority';
import {
  PROJECT_MENU,
  projectActiveNavState,
  ProjectMenu,
} from '@/store/projectDetail/ProjectNavTabStateStore';

const ProjectNavLinkVariants = cva(
  'flex whitespace-nowrap border-b-[3px] -mb-[1.8px] py-4 px-1 mobile:px-4 pc:text-[2rem] tablet:text-[1.5rem] mobile:text-lg font-semibold',
  {
    variants: {
      variant: {
        default:
          'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
        active: 'border-secondary text-secondary',
      },
    },
  },
);

const projectNavLinkClass = (isActive: boolean) =>
  ProjectNavLinkVariants({ variant: isActive ? 'active' : 'default' });

const {
  CREWS: {
    value: PROJECT_CREWS,
    child: {
      CREW_DETAIL: { value: PROJECT_CREW_DETAIL },
    },
  },
} = PROJECT_MENU;

const ProjectDetailNavTab = () => {
  const [activeTab, setActiveTab] = useRecoilState(projectActiveNavState);
  const resetActiveTabName = useResetRecoilState(projectActiveNavState);

  useEffect(() => {
    return () => resetActiveTabName();
  }, [resetActiveTabName]);

  const handleClickNavTab = (param: ProjectMenu) => {
    setActiveTab(param);
  };

  return (
    <div className='tablet:my-[3.9rem] mobile:mt-[1.5rem] mobile:mb-[3rem]'>
      <div className='border-b-[3px] border-grey300'>
        <nav className='-mb-px' aria-label='Tabs'>
          <ul className='flex tablet:space-x-10 mobile:justify-between'>
            {Object.values(PROJECT_MENU).map(({ name, value }) => (
              <li key={`tab-${value}`} className='cursor-pointer'>
                <div
                  className={projectNavLinkClass(
                    value === activeTab ||
                      (activeTab === PROJECT_CREW_DETAIL &&
                        value === PROJECT_CREWS),
                  )}
                  aria-current={value === activeTab}
                  onClick={() => handleClickNavTab(value)}
                >
                  {name}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProjectDetailNavTab;
