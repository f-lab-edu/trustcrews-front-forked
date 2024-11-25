import React, {Fragment} from 'react';
import useDropdownState from "@/hooks/common/useDropdownState";
import {useRecoilState} from "recoil";
import {selectRecruitPositionState} from "@/store/postDetail/PostDetailStateStore";
import {PostDetailPosition} from "@/utils/type";
import {BsChevronDown} from "@react-icons/all-files/bs/BsChevronDown";
import {Listbox, Transition} from "@headlessui/react";
import {bigIntToString, classNames} from "@/utils/common";
import {compareItems} from "@/app/_boardUtil/common";
import {defaultPositionSelectItem} from "@/app/_boardUtil/constant";

function RecruitPositionDropdown({recruitPositions}: { recruitPositions: PostDetailPosition[] }) {
    const {dropdownRef, openDropdown, setOpenDropdown} = useDropdownState();
    const [recruitPosition, setRecruitPosition] = useRecoilState(selectRecruitPositionState);

    const positionItems = [defaultPositionSelectItem, ...recruitPositions.map(({position: {positionId, name}}) => ({
        name,
        value: bigIntToString(positionId)
    }))];

    const selectedPosition = positionItems.find(item => item.value === recruitPosition)!;

    return (
        <Listbox
            aria-label='모집 포지션'
            value={selectedPosition}
            onChange={({value}) => setRecruitPosition(value)}
            by={compareItems}
        >
        <div ref={dropdownRef} className="relative z-10 self-center" onClick={() => setOpenDropdown(!openDropdown)}>
            <Listbox.Button
                className="px-4 flex justify-between w-[150px] h-[40px] mobile:w-[130px] mobile:h-[35px] items-center border-2 rounded-3xl cursor-pointer">
                <span className="text-base text-grey800 mobile:text-sm">
                    {selectedPosition.name}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <BsChevronDown aria-hidden="true" className="w-4 h-4 text-grey800"/>
                </span>
            </Listbox.Button>
            <Transition
                show={openDropdown}
                as={Fragment}
                leave="transition ease-in duration-10"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Listbox.Options
                    className="absolute bottom-12 p-2 flex flex-col w-[150px] h-[auto] mobile:w-[130px] mobile:h-[auto]  border-2 rounded-3xl bg-white"
                >
                    {positionItems.map(({name, value}) => (
                        <Listbox.Option
                            key={`position-${value}`}
                            className='p-2 text-lg mobile:text-sm font-bold text-grey900 cursor-pointer'
                            value={{name, value}}
                        >
                            {
                                ({selected, active}) =>
                                    (
                                        <span
                                            className={classNames(selected ? 'font-bold' : 'font-normal', 'flex items-center space-x-2 block truncate')}
                                        >
                                        {name}
                                    </span>
                                    )
                            }
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Transition>
        </div>
        </Listbox>
    );
}

export default RecruitPositionDropdown;
