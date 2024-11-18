'use client';
import React, {Fragment} from 'react';
import {useMediaQuery} from "react-responsive";
import {DropDownItem, ResponseBody, UserBasicInfo} from "@/utils/type";
import Avatar from '@/components/ui/Avatar';
import {useQuery} from "@tanstack/react-query";
import {getSimpleUser} from "@/service/user/user";
import UserMenuSkeleton from "@/components/ui/skeleton/header/UserMenuSkeleton";
import useLogout from "@/hooks/useLogout";
import {FaChevronDown} from "@react-icons/all-files/fa/FaChevronDown";
import {Menu, Transition} from "@headlessui/react";
import Link from "next/link";
import {classNames} from "@/utils/common";
import {isQueryDataReady} from "@/hooks/useProjectInfoSummary";


function UserMenu({data}: { data: ResponseBody<UserBasicInfo> }) {
    const isDesktop = useMediaQuery({query: '(min-width: 1280px)'});
    const {logout} = useLogout();

    const items: DropDownItem[] = [
        {name: '내 프로필', value: '/user/profile'},
        {name: '로그아웃', value: '/user/logout', onClickHandler: () => logout()},
    ]

    const {nickname, profileImgSrc} = data.data!;

    return (
        <div className='flex items-center mx-2 space-x-2'>
            <div aria-hidden='true' className='flex items-stretch space-x-2'>
                <Avatar size="2xs" alt="사용자 이미지" src={profileImgSrc}/>
                {
                    isDesktop && <span className='text-grey90 leading-loose'>{nickname}</span>
                }
            </div>
            <Menu as="div" className="relative flex text-center">
                <div>
                    <Menu.Button
                        className="flex items-center text-gray-400 hover:text-gray-600"
                    >
                        <span className='sr-only'>{`${nickname}의 사용자 메뉴`}</span>
                        <FaChevronDown className="h-4 w-4" aria-hidden="true"/>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className="absolute right-0 z-10 mt-2 tablet:min-w-[120px] mobile:min-w-[90px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1 ">
                            {
                                items.map(v =>
                                    <Menu.Item key={v.value}>
                                        {({active}) => (
                                            v.onClickHandler ?
                                                <span
                                                    onClick={() => v.onClickHandler!(v.value)}
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 tablet:text-[16px] mobile:text-sm'
                                                    )}
                                                >
                                                            {v.name}
                                                        </span>
                                                : <Link
                                                    href={v.value}
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 tablet:text-[16px] mobile:text-sm'
                                                    )}
                                                >
                                                    {v.name}
                                                </Link>
                                        )}
                                    </Menu.Item>
                                )
                            }
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );


}

export default UserMenu;