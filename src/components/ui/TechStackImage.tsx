import React from 'react';
import Image from "next/image";
import {useMediaQuery} from "react-responsive";
import useClientMount from "@/hooks/common/useClientMount";

interface TechStackImageProps {
    stackName: string;
    width?: number;
    height?: number;
}

function TechStackImage({stackName, width, height}: TechStackImageProps) {
    const fileName = stackName.toLowerCase().replace(".", "");


    return (
        <div
            className='relative inline-block pc:w-[32px] pc:h-[32px] tablet:w-[28px] tablet:h-[28px] mobile:w-[24px] mobile:h-[24px]'>
            <Image
                aria-hidden={true}
                src={`${process.env.NEXT_PUBLIC_URL}/images/tech/${fileName}.svg`}
                alt={stackName}
                fill
                sizes={"(max-width: 767px) 24px, (max-width: 1179px) 28px, 32px"}
            />
        </div>
    );
}

export default TechStackImage;