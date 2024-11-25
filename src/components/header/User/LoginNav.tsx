import React from 'react';
import Link from "next/link";
import useClientMount from "@/hooks/common/useClientMount";
import LoginNavSkeleton from "@/components/ui/skeleton/header/LoginNavSkeleton";

function LoginNav() {
    return (
        <Link
            aria-label='로그인 페이지'
            href='/login'
            className='mx-2 tablet:text-[20px] mobile:text-[16px] text-black100 font-semibold'
        >
            로그인
        </Link>
    );
}

export default LoginNav;