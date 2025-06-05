import Image from 'next/image';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { selectedTechStackState } from '@/store/posts/filter/TechStackFilterStateStore';
import { clsx } from 'clsx';

const TechStackResetButton = () => {
  const selectedTechStacks = useRecoilValue(selectedTechStackState);
  const resetSelectedTechStacks = useResetRecoilState(selectedTechStackState);

  const handleClickResetButton = () => {
    resetSelectedTechStacks();
  };

  return (
    <div
      onClick={handleClickResetButton}
      className={clsx(
        'flex items-center gap-1 ml-2 cursor-pointer mobile:mt-2',
        selectedTechStacks.length === 0 && 'hidden',
      )}
    >
      <Image
        src='/images/initialize.svg'
        alt='기술스택 초기화'
        width={15}
        height={15}
      />
      <span className='mobile:text-sm'>초기화</span>
    </div>
  );
};

export default TechStackResetButton;
