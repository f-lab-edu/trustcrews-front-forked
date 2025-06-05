import { clsx } from 'clsx';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { selectedTechStackState } from '@/store/posts/filter/TechStackFilterStateStore';
import {
  TechStackMapping,
  useTechStackMappings,
} from '@/features/techStack/api/getTechStackMappings';
import { bigIntToString } from '@/shared/utils/stringUtils';

const TechStackFilterResult = () => {
  const [selectedTechStacks, setSelectedTechStacks] = useRecoilState(
    selectedTechStackState,
  );

  const {
    data: { data: techStackMappings },
  } = useTechStackMappings();

  const handleClickTechStackRemove = (stack: TechStackMapping) => {
    setSelectedTechStacks((prevSelected) =>
      prevSelected.filter((prevStack) => prevStack !== stack),
    );
  };

  return (
    <ul className='flex flex-wrap mobile:max-h-[50px] mobile:overflow-y-auto'>
      {techStackMappings.map((techStackMapping) => (
        <li
          key={bigIntToString(techStackMapping.techStackId)}
          className={clsx(
            'flex gap-2 items-center justify-center py-1 px-2 mobile:px-1 cursor-pointer',
            !selectedTechStacks.includes(techStackMapping) && 'hidden',
          )}
          onClick={() => handleClickTechStackRemove(techStackMapping)}
        >
          {techStackMapping && (
            <div className='flex gap-1 bg-grey300 rounded-xl py-1 px-2'>
              <span className='text-xs self-center'>
                {techStackMapping.techStackName}
              </span>
              <Image
                src='/images/delete.svg'
                alt={`${techStackMapping.techStackName} 제거`}
                width={18}
                height={18}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TechStackFilterResult;
