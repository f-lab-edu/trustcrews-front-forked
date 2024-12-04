'use client';
import {classNames, makeImageSize} from "@/utils/common";
import Image, {StaticImageData} from "next/image";
import {HTMLAttributes, ImgHTMLAttributes} from "react";

interface ImageProps extends HTMLAttributes<HTMLImageElement> {
    src?: StaticImageData | string | null;
    size: string;
    alt: string;
}

function Avatar({src, size, alt, ...props}: ImageProps) {
    const imageSize = makeImageSize(size);

    let expectedSize;
    switch (size) {
        case "2xs":
            expectedSize = "24px";
            break;
        case "xs":
            expectedSize = "(min-width: 1280px) 40px, 32px";
            break;
        case "sm":
            expectedSize = "(min-width: 1280px) 64px, 40px";
            break;
        case "md":
            expectedSize = "(min-width: 1280px) 96px, 64px";
            break;
        case "lg":
            expectedSize = "(min-width: 1280px) 160px, 112px";
            break;
        default:
            throw new Error(`Unknown Avatar Size: ${size}`);
    }


    return (
        <>
            {
                src ? (
                    <div
                        aria-hidden='true'
                        className={
                            classNames(` relative inline-block ${imageSize} rounded-full ring-2 ring-white`,
                                props.className ? props.className : '')
                        }
                    >
                        <Image aria-hidden={true}
                               src={src}
                               alt={alt}
                               fill
                               sizes={expectedSize}
                               objectFit='cover'
                               className='rounded-full'
                        />
                    </div>
                ) : (
                    <div
                        aria-hidden='true'
                        className={`${imageSize} relative inline-block rounded-full bg-gray-100 ring-2 ring-white`}
                    >
                        <svg role='img' className={`w-full h-full text-gray-300 rounded-full`} fill="currentColor" viewBox='0 0 24 24' >
                            <path
                                d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                    </div>
                )
            }
        </>

    );
}

export default Avatar;