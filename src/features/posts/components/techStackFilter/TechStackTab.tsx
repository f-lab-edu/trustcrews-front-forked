import { MouseEvent } from 'react';
import { useTechCategories } from '@/features/techStack/api/getTechStackCategories';
import {
  DEFAULT_TECH_CATEGORY,
  techStackCategoryState,
} from '@/store/posts/filter/TechStackFilterStateStore';
import { SelectItem } from '@/shared/types/selectItem';
import { useRecoilState } from 'recoil';
import { bigIntToString } from '@/shared/utils/stringUtils';

const TechStackTab = () => {
  const {
    data: { data: categories },
  } = useTechCategories();

  const [selectedCategory, setSelectedCategory] = useRecoilState(
    techStackCategoryState,
  );

  const categoryItems: SelectItem<string, string>[] = [
    DEFAULT_TECH_CATEGORY,
    ...categories.map(({ techStackCategoryId, techStackCategoryName }) => ({
      name: techStackCategoryName,
      value: bigIntToString(techStackCategoryId),
    })),
  ];

  const handleClickCategory = (
    e: MouseEvent<HTMLLIElement>,
    category: SelectItem<string, string>,
  ) => {
    e.stopPropagation();
    setSelectedCategory(category);
  };

  const handleClickPadding = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <ul
      role='tablist'
      className='flex text-xl font-bold gap-6 border-b-2 mobile:text-sm mobile:gap-3'
      onClick={handleClickPadding}
    >
      {categoryItems.map((category) => {
        const { name, value } = category;
        const isActive = value === selectedCategory.value;
        return (
          <li
            key={value}
            role='tab'
            aria-selected={isActive}
            aria-controls={`techStack-panel-${value}`}
            onClick={(e) => handleClickCategory(e, category)}
            className={`cursor-pointer ${isActive ? 'text-black100 border-b-2 border-black100 pb-4' : 'text-grey800'}`}
          >
            {name}
          </li>
        );
      })}
    </ul>
  );
};

export default TechStackTab;
