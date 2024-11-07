import React, {HTMLAttributes} from 'react';
import {classNames} from "@/utils/common";

interface FormRowProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

function FormRow({children, ...props}: FormRowProps) {
    return (
        <div
            className={classNames(`w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3 mobile:mx-auto`, props.className || '')}>
            {children}
        </div>
    );
}

export default FormRow;