import TechStackImage from '@/features/techStack/components/TechStackImage';
import { MouseEvent } from 'react';
import {
  TechStackMapping,
  useTechStackMappings,
} from '@/features/techStack/api/getTechStackMappings';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  DEFAULT_TECH_CATEGORY,
  selectedTechStackState,
  techStackCategoryState,
} from '@/store/posts/filter/TechStackFilterStateStore';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { clsx } from 'clsx';

const TechStackTabPanel = () => {
  const {
    name: selectedTechStackCategoryName,
    value: selectedTechStackCategoryValue,
  } = useRecoilValue(techStackCategoryState);

  const [selectedTechStacks, setSelectedTechStacks] = useRecoilState(
    selectedTechStackState,
  );

  const {
    data: { data: techStackMappings },
  } = useTechStackMappings();

  const filteredTechStacks = techStackMappings.filter((stack) => {
    if (selectedTechStackCategoryName === DEFAULT_TECH_CATEGORY.name) {
      return true;
    }

    const { categories } = stack;
    if (Array.isArray(categories)) {
      return categories.includes(selectedTechStackCategoryName);
    }

    return false;
  });

  const handleClickTechStackItem = (
    e: MouseEvent<HTMLLIElement>,
    stack: TechStackMapping,
  ) => {
    e.stopPropagation();
    setSelectedTechStacks((prevSelected) => {
      if (prevSelected.includes(stack)) {
        return prevSelected.filter((prevStack) => prevStack !== stack);
      } else {
        return [...prevSelected, stack];
      }
    });
  };

  return (
    <ul
      role='tabpanel'
      id={`techStack-panel-${selectedTechStackCategoryValue}`}
      className='flex mt-4 gap-2 flex-wrap mobile:max-h-[80px] mobile:overflow-y-auto'
    >
      {filteredTechStacks.map((stack) => {
        const { techStackId, techStackName } = stack;
        const isActive =
          selectedTechStacks.length === 0 || selectedTechStacks.includes(stack);
        return (
          <li
            key={bigIntToString(techStackId)}
            role='checkbox'
            aria-checked={isActive}
            onClick={(e) => handleClickTechStackItem(e, stack)}
            className={clsx(
              'flex gap-2 items-center justify-center border-[1px] rounded-3xl py-1 px-2 border-grey400 cursor-pointer',
              isActive ? 'opacity-1' : 'opacity-30',
            )}
          >
            <div className='mobile:hidden'>
              <TechStackImage
                stackName={techStackName}
                width={30}
                height={30}
              />
            </div>
            <span className='text-base'>{techStackName}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default TechStackTabPanel;
