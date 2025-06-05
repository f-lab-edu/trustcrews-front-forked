'use client';

import { MouseEvent, MouseEvent as ReactMouseEvent, useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { BsChevronDown } from '@react-icons/all-files/bs/BsChevronDown';
import { TechStackMapping } from '@/features/techStack/api/getTechStackMappings';
import useDropdownState from '@/shared/hooks/useDropdownState';
import { selectedTechStackState } from '@/store/posts/filter/TechStackFilterStateStore';
import TechStackTab from '@/features/posts/components/techStackFilter/TechStackTab';
import TechStackTabPanel from '@/features/posts/components/techStackFilter/TechStackTabPanel';
import TechStackFilterResult from '@/features/posts/components/techStackFilter/TechStackFilterResult';
import TechStackResetButton from '@/features/posts/components/techStackFilter/TechStackResetButton';

const getSelectedTechStackText = (selectedTechStacks: TechStackMapping[]) => {
  if (selectedTechStacks.length > 0) {
    return selectedTechStacks.map((stack) => stack.techStackName).join(', ');
  }
  return '기술스택';
};

const TechStackFilter = () => {
  const { dropdownRef, openDropdown, setOpenDropdown } =
    useDropdownState<HTMLButtonElement>();

  const resetSelectedTechStacks = useResetRecoilState(selectedTechStackState);

  useEffect(() => {
    resetSelectedTechStacks();
  }, [resetSelectedTechStacks]);

  const handleClickTechStackButton = (e: ReactMouseEvent<HTMLElement>) => {
    e.preventDefault();
    setOpenDropdown((prev) => !prev);
  };

  const selectedTechStacks = useRecoilValue(selectedTechStackState);

  const handleClickPanelPadding = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <button
      aria-label='기술스택 선택'
      aria-expanded={openDropdown}
      aria-owns='tech-stack-dropdown'
      ref={dropdownRef}
      className='relative z-10'
      onClick={handleClickTechStackButton}
    >
      <div
        aria-hidden={true}
        className='px-4 flex justify-between w-[150px] h-[40px] mobile:w-[130px] mobile:h-[35px] items-center border-2 rounded-3xl cursor-pointer'
      >
        <div className='text-base text-grey800 mobile:text-sm block truncate'>
          {getSelectedTechStackText(selectedTechStacks)}
        </div>
        <BsChevronDown className='w-4 h-4 text-grey800' />
      </div>
      {openDropdown && (
        <div
          className='absolute top-12 py-3 px-5 flex flex-col w-[700px] mobile:w-[340px] border-2 rounded-3xl bg-white'
          onClick={handleClickPanelPadding}
        >
          <TechStackTab />
          <TechStackTabPanel />
          <div aria-live='polite' className='flex mt-6 flex-wrap gap-y-1'>
            <TechStackFilterResult />
            <TechStackResetButton />
          </div>
        </div>
      )}
    </button>
  );
};

export default TechStackFilter;
