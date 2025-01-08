import React from 'react';
import {VoteStatusCode, VoteStatusType} from "@/service/project/alert/type";
import {NoticeBadge, BadgeColor} from "@/utils/common";
import {VoteStatus} from "@/service/project/alert/constant";

type VoteStatusBadgeProps = {
    voteStatus: VoteStatusType,
}

class _VoteStatusBadge extends NoticeBadge {
    constructor(color:BadgeColor, text: VoteStatusType["name"]) {
        super(color, "sm", text);
    }
}

const VOTE_STATUS_BADGE: Record<VoteStatusCode, _VoteStatusBadge> = {
    VSTAT1001: new _VoteStatusBadge("green", VoteStatus.VSTAT1001.name),
    VSTAT1002: new _VoteStatusBadge("slate", VoteStatus.VSTAT1002.name),
} as const;

function VoteStatusBadge({voteStatus}: VoteStatusBadgeProps) {

    const badge = VOTE_STATUS_BADGE[voteStatus.code];

    return (
        <>
      <span
          className={`inline-flex items-center ${badge.size()} rounded-full transparent font-medium  ring-1 ring-inset ${badge.color()}`}
      >
        {badge.text()}
      </span>
        </>
    );
}

export default VoteStatusBadge;