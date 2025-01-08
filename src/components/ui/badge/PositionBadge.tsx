"use client";
import React from "react";
import {BADGE_SIZE} from "@/utils/common";
import {BadgeProps} from "@/utils/type";


function PositionBadge({ size, text = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex min-w-fit items-center ${BADGE_SIZE[size!]} rounded-full bg-[#F2F4F8] text-[#4A5E75] font-medium`}
    >
      {text}
    </span>
  );
}

export default PositionBadge;
