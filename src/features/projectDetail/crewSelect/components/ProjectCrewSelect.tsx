import { useProjectCrewList } from '@/features/projectDetail/crews/api/getProjectCrewList';
import { bigIntToString, numStrToBigInt } from '@/shared/utils/stringUtils';
import { Fragment } from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { selectItemComparator } from '@/shared/utils/selectItemComparator';
import { AiFillCaretDown } from '@react-icons/all-files/ai/AiFillCaretDown';
import { clsx } from 'clsx';
import Avatar from '@/shared/ui/Avatar';
import { DEFAULT_CREW_OPTION } from '@/features/projectDetail/crewSelect/constants/defaultCrewOption';

const selectButtonTextClass = ({
  defaultSelected,
  disabled,
}: {
  defaultSelected: boolean;
  disabled: boolean;
}) =>
  clsx(
    'block truncate',
    defaultSelected && 'text-greyUnselect',
    disabled && 'text-gray-700/60',
  );

type ProjectCrewSelectProps = {
  projectId: string;
  selected: string;
  setSelected: (item: string) => void;
  disabled: boolean;
};

const ProjectCrewSelect = ({
  projectId,
  selected,
  setSelected,
  disabled,
}: ProjectCrewSelectProps) => {
  const {
    data: {
      data: { projectCrews: crewList },
    },
  } = useProjectCrewList(numStrToBigInt(projectId));

  const crewProfileImgSrcList = crewList.map((crew) => ({
    profileImgSrc: crew.user.profileImgSrc,
    crewId: bigIntToString(crew.crewId),
  }));

  const crewSelectItems = [
    DEFAULT_CREW_OPTION,
    ...crewList.map((crew) => ({
      name: crew.user.nickname,
      value: bigIntToString(crew.crewId),
    })),
  ];

  const selectedCrew =
    crewSelectItems.find((item) => item.value === selected) ||
    DEFAULT_CREW_OPTION;

  return (
    <div className='w-[350px] mobile:w-[220px] ml-auto text-left'>
      <Listbox
        value={selectedCrew}
        onChange={({ value }) => {
          setSelected(value);
        }}
        by={selectItemComparator}
        disabled={disabled}
      >
        {({ open }) => (
          <div className='relative w-full tablet:w-[200px]'>
            <ListboxButton className='w-full mobile:text-sm cursor-default rounded-lg border-1 flex-1 appearance-none border py-2 pl-4 pr-10 text-left bg-white border-gray-300 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'>
              <span
                className={selectButtonTextClass({
                  defaultSelected: !selectedCrew,
                  disabled,
                })}
              >
                {selectedCrew.name}
              </span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <AiFillCaretDown
                  className='w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </ListboxButton>
            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <ListboxOptions className='absolute z-50 mt-1 max-h-[120px] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {crewSelectItems.map(({ name, value }) => (
                  <ListboxOption
                    key={`key-${value}`}
                    className={({ focus }) =>
                      clsx(
                        'relative cursor-default select-none py-2 pl-3 pr-9 mobile:text-sm',
                        focus
                          ? 'bg-primary opacity-50 text-white'
                          : 'text-gray-900',
                      )
                    }
                    value={{ name, value }}
                  >
                    {({ selected, focus }) => (
                      <>
                        <span
                          className={clsx(
                            'block items-center space-x-2 truncate',
                            selected ? 'font-bold' : 'font-normal',
                          )}
                        >
                          {value !== '0' && (
                            <Avatar
                              src={
                                crewProfileImgSrcList.find(
                                  (v) => v.crewId === value,
                                )?.profileImgSrc || ''
                              }
                              alt='크루 아바타 이미지'
                              size='xxs'
                            />
                          )}
                          <span>{name}</span>
                        </span>
                        {selected && (
                          <span
                            className={clsx(
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                              focus ? 'text-white' : 'text-primary',
                            )}
                          ></span>
                        )}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default ProjectCrewSelect;
