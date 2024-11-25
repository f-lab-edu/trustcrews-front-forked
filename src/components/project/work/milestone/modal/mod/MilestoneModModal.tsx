'use client';
import React, {useEffect, useState} from 'react';
import {useRecoilValue, useResetRecoilState} from "recoil";
import Modal from "@/components/ui/Modal";
import {createPortal} from "react-dom";
import {
    MilestoneModDataField,
    milestoneModDataStateStore,
    milestoneModModalStateStore
} from "@/store/project/task/MilestoneStateStore";
import useUpdateMilestone from "@/hooks/project/task/useUpdateMilestone";
import MilestoneModContent from "@/components/project/work/milestone/modal/mod/MilestoneModContent";
import MilestoneModDate from "@/components/project/work/milestone/modal/mod/MilestoneModDate";
import useMilestone from "@/hooks/project/task/useMilestone";
import {bigIntToString} from "@/utils/common";
import {MilestoneModReqData} from "@/service/project/milestone";

function MilestoneModModal() {
    const {isOpen, title} = useRecoilValue(milestoneModModalStateStore);
    const resetMilestoneModModalState = useResetRecoilState(milestoneModModalStateStore);
    const resetMilestoneModData = useResetRecoilState(milestoneModDataStateStore);
    const milestoneModData = useRecoilValue(milestoneModDataStateStore);
    const [portalElement, setPortalElement] = useState<Element | null>(null);

    const {
        milestoneInfo,
        isFetching
    } = useMilestone(
        bigIntToString(milestoneModData.milestoneId as MilestoneModDataField<'milestoneId'>),
        isOpen
    );

    const {updateMilestone, isUpdating} = useUpdateMilestone();


    useEffect(() => {
        setPortalElement(document.getElementById('modal'));

        if (!isOpen) {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.overflowY = 'auto';

            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }, [isOpen]);


    if (isFetching || !milestoneInfo) return null;

    const {content:initContent, startDate:initStartDate, endDate:initEndDate, updateDate} = milestoneInfo!;

    // 마일스톤 수정
    const onClickConfirmHandler = () => {
        const {milestoneId, authMap, content, startDate, endDate} = milestoneModData;
        const reqData:MilestoneModReqData = {
            milestoneId,
            authMap,
            content: content ? content : initContent,
            startDate: startDate ? startDate : initStartDate,
            endDate: endDate ? endDate : initEndDate
        };
        updateMilestone(reqData);
    }

    // 모달 close
    const onCloseHandler = () => {
        resetMilestoneModData();
        resetMilestoneModModalState();
    };


    return (
        <>
            {
                isOpen && portalElement
                    ? createPortal((
                        <Modal
                            isOpen={isOpen}
                            close={onCloseHandler}
                            title={title}
                            isUpdating={isUpdating}
                            onClickConfirmHandler={onClickConfirmHandler}
                        >
                            <section className='tablet:w-[450px] mobile:w-[280px] max-h-[500px] mb-4 flex-col mt-5'>
                                <div className="space-y-5 mobile:space-y-3 mx-4 mobile:mx-0 mobile:text-sm">
                                    <MilestoneModContent initData={initContent}/>
                                    <MilestoneModDate initStartDate={initStartDate} initEndDate={initEndDate}/>
                                    <div className='max-w-[360px] flex'>
                                        <label className="text-gray-700 font-semibold self-center">업데이트</label>
                                        <div className='min-w-[280px] h-[42px] mobile:h-[38px] flex space-x-3 ml-auto'>
                                            <div
                                                className=' pl-2 text-left self-center'>
                                                {updateDate}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </Modal>
                    ), portalElement)
                    : null
            }
        </>

    );
}


export default MilestoneModModal;