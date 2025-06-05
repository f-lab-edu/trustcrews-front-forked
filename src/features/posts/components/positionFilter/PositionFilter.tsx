import { MouseEvent, useEffect } from 'react';
import { BsChevronDown } from '@react-icons/all-files/bs/BsChevronDown';
import useDropdownState from '@/shared/hooks/useDropdownState';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { selectedPositionState } from '@/store/posts/PostSearchStateStore';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { usePositionList } from '@/features/position/api/getPositionList';
import { DEFAULT_POSITION_OPTION } from '@/features/position/constants/defaultPositionOption';
import { clsx } from 'clsx';
import { SelectItem } from '@/shared/types/selectItem';

const getSelectedPositionText = (
  selectedPosition: SelectItem<string, string>,
) => {
  return selectedPosition.name;
};

const PositionFilter = () => {
  const { dropdownRef, openDropdown, setOpenDropdown } =
    useDropdownState<HTMLButtonElement>();

  const resetSelectedPosition = useResetRecoilState(selectedPositionState);
  const [selectedPosition, setSelectedPosition] = useRecoilState(
    selectedPositionState,
  );

  useEffect(() => {
    resetSelectedPosition();
  }, [resetSelectedPosition]);

  const handleClickPositionDropdownButton = () => {
    setOpenDropdown((prev) => !prev);
  };

  const handleClickPositionItem = (
    e: MouseEvent<HTMLLIElement>,
    item: { name: string; value: string },
  ) => {
    e.stopPropagation();
    setSelectedPosition(item);
  };

  const { data: positions } = usePositionList();

  const positionItems = [
    DEFAULT_POSITION_OPTION,
    ...positions.data.map(({ positionId, positionName }) => ({
      name: positionName,
      value: bigIntToString(positionId),
    })),
  ];

  const selected =
    positionItems.find((item) => item.value === selectedPosition.value) ||
    DEFAULT_POSITION_OPTION;

  return (
    <button
      aria-label='포지션 선택'
      aria-expanded={openDropdown}
      aria-owns='position-dropdown'
      ref={dropdownRef}
      className='relative z-10'
      onClick={handleClickPositionDropdownButton}
    >
      <div
        aria-hidden={true}
        className='px-4 flex justify-between w-[150px] h-[40px] mobile:w-[130px] mobile:h-[35px] items-center border-2 rounded-3xl cursor-pointer'
      >
        <div className='text-base text-grey800 mobile:text-sm block truncate'>
          {getSelectedPositionText(selectedPosition)}
        </div>
        <BsChevronDown className='w-4 h-4 text-grey800' />
      </div>
      {openDropdown && (
        <div className='absolute top-12 p-2 flex flex-col w-[150px] h-[auto] mobile:w-[130px] mobile:h-[auto]  border-2 rounded-3xl bg-white'>
          <ul className='text-xl font-bold gap-6 border-b-2 mobile:hidden'>
            {positionItems.map(({ name, value }) => (
              <li
                key={`position-${value}`}
                className='p-2 text-lg mobile:text-sm font-bold text-grey900 cursor-pointer'
                onClick={(e) => handleClickPositionItem(e, { name, value })}
              >
                <span
                  className={clsx(
                    'flex items-center space-x-2 truncate',
                    selected.value === value ? 'font-bold' : 'font-normal',
                  )}
                >
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </button>
  );
};

export default PositionFilter;
