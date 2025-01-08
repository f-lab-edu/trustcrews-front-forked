import React from 'react';
import {VAlertRecruitData} from "@/service/project/alert/type";
import NoticeBadge from "@/components/ui/badge/NoticeBadge";
import {AlertType} from "@/service/project/alert/constant";
import VoteStatusBadge from "@/components/ui/badge/VoteStatusBadge";
import {useSetRecoilState} from "recoil";
import {vAlertRecruitModalState} from "@/store/project/alert/modal/VAlertModalStateStore";

type VAlertRecruitListItemProps = {
    data: VAlertRecruitData;
}
function VAlertRecruitListItem({data}:VAlertRecruitListItemProps) {
    const {alertId, voteId, applyId, contents, createDate, voteStatus} = data;
    const setVAlertRecruitModalState = useSetRecoilState(vAlertRecruitModalState);

    const onClickAlertItemHandler = () => {
        setVAlertRecruitModalState({isOpen:true, title: contents, voteId, alertId, applyId});
    }

    return (
        <li
            key={alertId}
            className={`flex items-center gap-x-10 px-3 py-5 pc:text-lg mobile:text-sm text-grey900 cursor-pointer`}
            onClick={onClickAlertItemHandler}
        >
            <div className='flex items-center gap-x-4'>
                <NoticeBadge noticeType={AlertType.PRA1002}/>
                <VoteStatusBadge voteStatus={voteStatus}/>
                {contents}
            </div>
            <div className='ml-auto text-grey600'>
                {createDate}
            </div>
        </li>
    );
}

export default VAlertRecruitListItem;