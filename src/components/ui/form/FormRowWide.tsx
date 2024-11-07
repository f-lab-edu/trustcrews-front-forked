import React, {HTMLAttributes, ReactNode} from 'react';
import {classNames} from "@/utils/common";

interface FormRowWideProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
function FormRowWide({children, ...props}: FormRowWideProps) {
    return (
        <div className={classNames('w-full mobile:w-[300px] mx-auto', props.className || '')}>
            {children}
        </div>
    );
}

export default FormRowWide;