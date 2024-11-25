'use client';
import React from 'react';
import Image from 'next/image';
import logo from '../../../public/images/logo.png';
import Link from "next/link";
import RegisterNav from "@/components/header/RegisterNav";
import {hasCookie} from "cookies-next";
import LoginNav from "@/components/header/User/LoginNav";
import {UserMenu} from "@/components/header/User";
import useClientMount from "@/hooks/common/useClientMount";

function Header() {
    const mounted = useClientMount();

    return (
        <header className='flex flex-col'>
            <div className='flex items-center justify-between h-[80px] mobile:h-[65px] my-1'>
                <div id='top-navigation-wrap'>
                    <Link
                        href='/'
                        aria-label='trustcrews 홈페이지'
                        className='inline-block relative pc:w-[200px] pc:h-[60px] tablet:w-[150px] tablet:h-[50px] mobile:w-[120px] mobile:h-[40px]'>
                        <Image
                            src={logo}
                            alt='trustcrew 로고'
                            aria-hidden='true'
                            fill
                            style={{
                                objectFit: 'cover',
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-30%)'
                            }}
                            quality={100}
                            priority
                        />
                    </Link>
                </div>
                <div id='top-navigation-main' className='flex items-center'>
                    <RegisterNav/>
                    <div>
                        {
                            mounted && hasCookie("user_id")
                                ? <UserMenu />
                                : <LoginNav/>
                        }
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;