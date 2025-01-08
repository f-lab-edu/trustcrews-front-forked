import React, {HTMLAttributes} from 'react';
import {BADGE_SIZE, classNames} from "@/utils/common";
import {BadgeProps} from "@/utils/type";

interface BadgeStyleSkeletonProps extends HTMLAttributes<HTMLDivElement>, BadgeProps {
    text?: string;
}

function BadgeStyleSkeleton({size, text = '시작전', ...props}: BadgeStyleSkeletonProps) {
    return (
        <div
            className={classNames(props.className || '',
                `${BADGE_SIZE[size!]} bg-gray-200 rounded-full animate-pulse text-transparent`)}>
            {text}
        </div>
    );
}

export default BadgeStyleSkeleton;