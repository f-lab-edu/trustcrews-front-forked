import React from 'react';
import {BADGE_SIZE} from "@/utils/common";
import {BadgeProps} from "@/utils/type";

function ProjectRoleBadge({text = ''}: BadgeProps) {

    const bgColor = text === '매니저' ? 'bg-[#FF513A]' : 'bg-[#FFF9CF]';
    const textColor = text === '매니저' ? 'text-[#FFFFFF]' : 'text[#7B5C03]';

    return (
        <span
            className={`inline-flex items-center rounded-full ${BADGE_SIZE.sm} ${bgColor} ${textColor} font-medium `}>
            {text}
        </span>
    );
}

export default ProjectRoleBadge;