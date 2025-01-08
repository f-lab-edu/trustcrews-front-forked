import React from 'react';
import {NOTICE_BADGE} from "@/utils/common";
import {AlertMenu} from "@/service/project/alert/type";

interface NoticeBadgeProps {
    noticeType: AlertMenu
}

function NoticeBadge({noticeType}: NoticeBadgeProps) {

    const badge = NOTICE_BADGE[noticeType.code];

    return (
        <>
      <span
          className={`inline-flex items-center ${badge.size()} ${badge.color()} rounded-full font-medium ring-1 ring-inset`}
      >
        {badge.text()}
      </span>
        </>
    );
}

export default NoticeBadge;