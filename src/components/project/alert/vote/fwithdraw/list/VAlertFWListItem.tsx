import React from 'react';
import {VAlertFWData} from "@/service/project/alert/type";
import NoticeBadge from "@/components/ui/badge/NoticeBadge";
import {AlertType} from "@/service/project/alert/constant";
import VoteStatusBadge from "@/components/ui/badge/VoteStatusBadge";
import {useSetRecoilState} from "recoil";
import {vAlertFWModalState} from "@/store/project/alert/modal/VAlertModalStateStore";

type VAlertFwListItemProps = {
    data: VAlertFWData
}

function VAlertFwListItem({data}: VAlertFwListItemProps) {
    const {alertId, contents, createDate, voteStatus, voteId, fwMemberId} = data;
    const setVAlertFWModalState = useSetRecoilState(vAlertFWModalState);

    const onClickAlertItemHandler = () => {
        setVAlertFWModalState({isOpen:true, title:contents, voteId, fwMemberId});
    }

    return (
        <li
            key={alertId}
            className={`flex items-center gap-x-10 px-3 py-5 pc:text-lg mobile:text-sm text-grey900 cursor-pointer`}
            onClick={onClickAlertItemHandler}
        >
            <div className='flex items-center gap-x-4'>
                <NoticeBadge noticeType={AlertType.PRA1003}/>
                <VoteStatusBadge voteStatus={voteStatus}/>
                {contents}
            </div>
            <div className='ml-auto text-grey600'>
                {createDate}
            </div>
        </li>
    );
}

export default VAlertFwListItem;