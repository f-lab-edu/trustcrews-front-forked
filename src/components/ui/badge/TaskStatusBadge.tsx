import React from 'react';
import {BadgeProps} from "@/utils/type";
import {BADGE_SIZE, getStatusBadgeColor} from "@/utils/common";


function TaskStatusBadge({size, text = '시작전'}: BadgeProps) {
    const {bgColor, textColor} = getStatusBadgeColor(text);


    return (
        <span
            className={`inline-flex items-center rounded-full ${BADGE_SIZE[size!]} ${bgColor} font-medium ${textColor} `}
        >
        {text}
      </span>
    );
}

export default TaskStatusBadge;