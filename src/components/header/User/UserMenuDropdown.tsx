'use client';

import React from 'react';
import DropDownWithIcon from "@/components/ui/DropDownWithIcon";
import {FaChevronDown} from "@react-icons/all-files/fa/FaChevronDown";
import {DropDownItem} from "@/utils/type";
import useLogout from "@/hooks/user/useLogout";

function UserMenuDropdown() {
    const {logout} = useLogout();

    const items: DropDownItem[] = [
        {name: '내 프로필', value: '/user/profile'},
        {name: '로그아웃', value: '/user/logout', onClickHandler: () => logout()},
    ]

    return (
        <DropDownWithIcon
            items={items}
            icon={<FaChevronDown className="h-4 w-4" aria-hidden="true"/>}
            srOnlyButtonName='사용자 메뉴 버튼'
        />
    );
}

export default UserMenuDropdown;