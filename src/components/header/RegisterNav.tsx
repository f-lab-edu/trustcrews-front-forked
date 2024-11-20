import React from 'react';
import {useMediaQuery} from "react-responsive";
import {IoCreateOutline} from "@react-icons/all-files/io5/IoCreateOutline";
import Link from "next/link";

function RegisterNav() {
    return (
        <Link href='/postRegister' aria-label='프로젝트 생성 페이지'>
            <div aria-hidden='true' className='mx-4 tablet:text-[20px] mobile:text-[16px] text-black100 font-semibold'>
                <span className='mobile:hidden'>새 프로젝트</span>
                <IoCreateOutline className='pc:hidden tablet:hidden h-6 w-6'/>
            </div>
        </Link>
    );
}

export default RegisterNav;