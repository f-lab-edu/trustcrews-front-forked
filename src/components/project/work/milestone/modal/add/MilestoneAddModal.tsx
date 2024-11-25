'use client';
import React, {useEffect, useState} from 'react';
import {useRecoilValue, useResetRecoilState} from "recoil";
import Modal from "@/components/ui/Modal";
import {createPortal} from "react-dom";
import {
    milestoneAddDataStateStore,
    milestoneAddModalStateStore,
    milestoneModDataStateStore
} from "@/store/project/task/MilestoneStateStore";
import useCreateMilestone from "@/hooks/project/task/useCreateMilestone";
import MilestoneAddDate from "@/components/project/work/milestone/modal/add/MilestoneAddDate";
import MilestoneAddContent from "@/components/project/work/milestone/modal/add/MilestoneAddContent";

function MilestoneAddModal() {
    const {isOpen, title} = useRecoilValue(milestoneAddModalStateStore);
    const [portalElement, setPortalElement] = useState<Element | null>(null);

    const resetMilestoneModModalState = useResetRecoilState(milestoneAddModalStateStore);
    const resetMilestoneModData = useResetRecoilState(milestoneModDataStateStore);
    const milestoneAddData = useRecoilValue(milestoneAddDataStateStore);

    const {createMilestone, isCreating} = useCreateMilestone();


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
                            isUpdating={isCreating}
                            onClickConfirmHandler={() => createMilestone(milestoneAddData)}
                        >
                            <section className='tablet:w-[450px] mobile:w-[280px] max-h-[500px] mb-4 flex-col mt-5'>
                                <div className="space-y-5 mobile:space-y-3 mx-4 mobile:mx-0 mobile:text-sm">
                                    <MilestoneAddContent/>
                                    <MilestoneAddDate/>
                                </div>
                            </section>
                        </Modal>
                    ), portalElement)
                    : null
            }
        </>

    );
}


export default MilestoneAddModal;