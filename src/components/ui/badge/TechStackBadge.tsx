'use client';
import React from 'react';
import {BADGE_SIZE} from "@/utils/common";

interface TechStackBadgeProps {
    text: string;
    className?: string;
}


function TechStackBadge({text, className}: TechStackBadgeProps) {
    return (
        <span
            className={`inline-flex items-center rounded-full bg-primary text-white font-medium ${BADGE_SIZE.xs} ${className}`}>
            {text}
        </span>
    );
}

export default TechStackBadge;