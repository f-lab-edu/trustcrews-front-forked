'use client';
import React, {useEffect} from 'react';
import Image from 'next/image';
import logo from '../../../public/images/logo.png';
import Link from "next/link";
import RegisterNav from "@/components/header/RegisterNav";
import useClientMount from "@/hooks/useClientMount";
import {useRecoilState} from "recoil";
import {userStateStore} from "@/store/user/UserStateStore";
import {getCookie, hasCookie} from "cookies-next";
import LoginNav from "@/components/header/User/LoginNav";
import {UserMenu} from "@/components/header/User";
import {useQuery} from "@tanstack/react-query";
import {ResponseBody, UserBasicInfo} from "@/utils/type";
import {getSimpleUser} from "@/service/user/user";
import UserMenuSkeleton from "@/components/ui/skeleton/header/UserMenuSkeleton";
import {isQueryDataReady} from "@/hooks/useProjectInfoSummary";
import {useRouter} from "next/navigation";

function Header() {
    const router = useRouter();
    const mounted = useClientMount();
    const [userIdState, setUserIdState] = useRecoilState(userStateStore);

    useEffect(() => {
        if (userIdState === null && hasCookie("user_id")) {
            setUserIdState(getCookie("user_id") as string);
        }

        if (userIdState !== null && !hasCookie("user_id")) {
            setUserIdState(null);
        }
    }, [userIdState, setUserIdState]);


    const {data, isPending, isRefetching, isError, isRefetchError} = useQuery<ResponseBody<UserBasicInfo>, Error, ResponseBody<UserBasicInfo>>(
        {
            queryKey: ['simpleUserInfo'],
            queryFn: getSimpleUser,
            staleTime: 0,
            enabled: userIdState !== null
        }
    );
    const isUserDataPreparing = isPending || isRefetching;
    const isUserDataError = isError || isRefetchError;
    const isUserDataReady = isQueryDataReady(isUserDataPreparing, isUserDataError, data);

    useEffect(() => {
        if(isUserDataError) router.replace("/login");
        setUserIdState(null);
    },[isUserDataError, router, setUserIdState])



    return mounted && (
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
                            userIdState === null || isUserDataError
                                ? <LoginNav/>
                                : (
                                    isUserDataReady
                                        ? <UserMenu data={data}/>
                                        : <UserMenuSkeleton/>
                                )
                        }
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;