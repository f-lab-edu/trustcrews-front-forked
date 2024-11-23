'use client';
import React from 'react';
import Image from "next/image";
import {useMediaQuery} from "react-responsive";
import useClientMount from "@/hooks/useClientMount";

interface TechStackImageProps {
    stackName: string;
    width?: number;
    height?: number;
}

function TechStackImage({stackName, width, height}: TechStackImageProps) {
    const mounted = useClientMount();
    const fileName = stackName.toLowerCase().replace(".", "");

    const isMobile = useMediaQuery({maxWidth: 700});
    const isDesktop = useMediaQuery({query: '(min-width: 1280px)'});

    const responsiveWidth = isMobile ? 20 : (isDesktop ? 32 : 26);
    const responsiveHeight = isMobile ? 20 : (isDesktop ? 32 : 26);

    if(!mounted) return null;

    return (
        <Image
            aria-hidden={true}
            src={`${process.env.NEXT_PUBLIC_URL}/images/tech/${fileName}.svg`}
            alt={stackName}
            fill={responsiveWidth && responsiveHeight ? undefined : true}
            width={responsiveWidth ? responsiveWidth : undefined}
            height={responsiveHeight ? responsiveHeight : undefined}
        />
    );
}

export default TechStackImage;