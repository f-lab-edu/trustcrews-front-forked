import React, {HTMLAttributes} from 'react';
import {classNames} from "@/utils/common";

interface ErroredSectionProps extends HTMLAttributes<HTMLDivElement>{
    children: React.ReactNode;
}
function ErroredSection({children, ...props}: ErroredSectionProps) {
    return (
        <div className={classNames('w-full px-6 py-2 text-center font-medium text-greyDarkblue rounded-lg', props.className || '')}>{children}</div>
    );
}

export default ErroredSection;