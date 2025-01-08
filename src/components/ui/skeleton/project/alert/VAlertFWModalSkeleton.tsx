import React from 'react';
import AvatarSkeleton from "@/components/ui/skeleton/AvatarSkeleton";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import BadgeStyleSkeleton from "@/components/ui/skeleton/BadgeStyleSkeleton";

function VAlertFwModalSkeleton() {
    return (
        <section className='alertModal_contents'>
            <section
                className='tablet:max-w-[400px] mx-auto pt-5 flex-col items-center'>
                <AvatarSkeleton size='md' className='mx-auto'/>
                <Skeleton className='h-6 w-[80px] my-1 mx-auto'/>
                <div className='mt-2 mx-auto flex justify-center space-x-2'>
                    <BadgeStyleSkeleton className='w-10 h-2' size='md'/>
                    <BadgeStyleSkeleton className='w-10 h-2' size='md'/>
                </div>
            </section>
            <Skeleton className='tablet:max-w-[400px] h-[140px] mx-auto mt-8'/>
            <section className='tablet:max-w-[400px] h-[250px] mx-auto flex flex-col justify-center'>
                <Skeleton className='w-[80px] h-10 mx-auto'/>
                <Skeleton className='w-[70%] h-6 mx-auto mt-2 mb-3'/>
                <Skeleton className='w-[80%] h-[100px] mx-auto my-2'/>
            </section>
        </section>
    );
}

export default VAlertFwModalSkeleton;