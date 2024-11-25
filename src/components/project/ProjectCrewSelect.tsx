'use client';
import React, {Fragment} from 'react';
import useProjectCrewList from "@/hooks/project/crew/useProjectCrewList";
import {useRecoilValue} from "recoil";
import {Listbox, Transition} from "@headlessui/react";
import {bigIntToString, classNames, numStrToBigInt} from "@/utils/common";
import {AiFillCaretDown} from "@react-icons/all-files/ai/AiFillCaretDown";
import Avatar from "@/components/ui/Avatar";
import SelectSkeleton from "@/components/ui/skeleton/SelectSkeleton";
import {projectIdState} from "@/store/project/ProjectInfoStateStore";
import {compareItems} from "@/app/_boardUtil/common";

export const DEFAULT_CREW_OPTION = {name: '멤버 선택', value: '0'} as const;

type ProejctCrewSelectProps = { disabled: boolean, assignedUserId: bigint, setAssignedUserId: (id: bigint) => void };

function ProjectCrewSelect({disabled, assignedUserId, setAssignedUserId}: ProejctCrewSelectProps) {
    const projectId = useRecoilValue(projectIdState)!;
    const {crewList, isFetching} = useProjectCrewList(projectId);

    if (isFetching) return <SelectSkeleton label='' placeholder='담당 멤버' className='max-w-[150px]'/>;

    const crewProfileImgSrcList = crewList.map((crew) =>
        ({profileImgSrc: crew.user.profileImgSrc, projectMemberId: bigIntToString(crew.projectMemberId)}));

    const crewSelectItems = [DEFAULT_CREW_OPTION, ...crewList.map((crew) => ({
        name: crew.user.nickname,
        value: bigIntToString(crew.projectMemberId)
    }))];

    const selectedCrew = crewSelectItems.find(item => item.value === bigIntToString(assignedUserId))!;

    return (
        <Listbox
            value={selectedCrew}
            onChange={({value}) => {
                setAssignedUserId(numStrToBigInt(value)
                )
            }}
            by={compareItems}
            disabled={disabled}
        >
            {({open}) => (
                <div className="relative w-full tablet:w-[200px]">
                    <Listbox.Button
                        className="w-full mobile:text-sm cursor-default rounded-lg border-1 flex-1 appearance-none border py-2 pl-4 pr-10 text-left bg-white border-gray-300 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                              <span
                                  className={classNames(selectedCrew ? '' : 'text-greyUnselect', 'block truncate', `${disabled && 'text-gray-700/60'}`)}
                              >
                                {selectedCrew.name}
                              </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <AiFillCaretDown className="w-5 text-gray-400" aria-hidden="true"/>
                              </span>
                    </Listbox.Button>
                    <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            className="absolute z-50 mt-1 max-h-[120px] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {crewSelectItems.map(({name, value}) => (
                                <Listbox.Option
                                    key={`key-${value}`}
                                    className={({active}) => classNames(
                                        active ? 'bg-primary opacity-50 text-white' : 'text-gray-900',
                                        'relative cursor-default select-none py-2 pl-3 pr-9 mobile:text-sm')}
                                    value={{name, value}}
                                >
                                    {
                                        ({selected, active}) =>
                                            (
                                                <>
                                                        <span
                                                            className={classNames(selected ? 'font-bold' : 'font-normal', 'flex items-center space-x-2 block truncate')}>
                                                            {
                                                                value !== '0' &&
                                                                <Avatar
                                                                    src={crewProfileImgSrcList.find(v => v.projectMemberId === value)!.profileImgSrc}
                                                                    alt={`${name}의 프로필 이미지`}
                                                                    size='2xs'/>
                                                            }
                                                            <span>{name}</span>
                                                        </span>
                                                    {
                                                        selected ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? 'text-white' : 'text-primary',
                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                    )}
                                                                ></span>
                                                            )
                                                            : null
                                                    }
                                                </>
                                            )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            )}
        </Listbox>
    )
}

export default ProjectCrewSelect;