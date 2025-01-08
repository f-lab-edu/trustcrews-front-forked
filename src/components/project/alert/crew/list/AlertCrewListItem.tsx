import React from 'react';
import {AlertCrewData} from "@/service/project/alert/type";
import NoticeBadge from "@/components/ui/badge/NoticeBadge";
import {AlertType} from "@/service/project/alert/constant";

function AlertCrewListItem({data}: { data: AlertCrewData }) {
    const {contents, createDate} = data;
    return (
        <li className='flex items-center gap-x-10 px-3 py-5 pc:text-lg mobile:text-sm text-grey900'>
            <div className='flex items-center gap-x-4'>
                <NoticeBadge noticeType={AlertType.PRA2001}/>
                {contents}
            </div>
            <div className='ml-auto text-grey600'>
                {createDate}
            </div>
        </li>
    );
}

export default AlertCrewListItem;