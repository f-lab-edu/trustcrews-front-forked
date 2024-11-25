import React, {useEffect, useRef} from 'react';
import {useRecoilValue, useResetRecoilState} from "recoil";
import {TaskModalType, taskModModalDataStateStore, taskModModalStateStore} from "@/store/project/task/TaskStateStore";
import useModalPortalElement from "@/hooks/common/useModalPortalElement";
import useUpdateTask from "@/hooks/project/task/useUpdateTask";
import {createPortal} from "react-dom";
import Modal from "@/components/ui/Modal";
import TaskContent from "@/components/project/work/work/modal/TaskContent";
import TaskDate from "@/components/project/work/work/modal/TaskDate";
import TaskAssignedCrew from "@/components/project/work/work/modal/TaskAssignedCrew";
import TaskContentDetail from "../taskContentDetail/TaskContentDetail";
import TaskProgressStatus from "@/components/project/work/work/modal/mod/TaskProgressStatus";
import useCompleteTask from "@/hooks/project/task/useCompleteTask";
import {getCookie} from "cookies-next";
import {numStrToBigInt} from "@/utils/common";
import {TASK_STATUS} from "@/app/project/@task/_utils/constant";

const modalType: TaskModalType = 'mod';

function TaskModModal() {
    const {isOpen, title} = useRecoilValue(taskModModalStateStore);
    const [portalElement, setPortalElement] = useModalPortalElement(isOpen);

    const modModalData = useRecoilValue(taskModModalDataStateStore);
    const resetModModalState = useResetRecoilState(taskModModalStateStore);
    const resetModModalData = useResetRecoilState(taskModModalDataStateStore);

    const {updateTask, isUpdating} = useUpdateTask();

    const {completeTask, isUpdating: isCompleting} = useCompleteTask();

    function onCloseHandler() {
        resetModModalData();
        resetModModalState();
    }

    function onConfirmHandler() {
        if (modModalData.progressStatus === TASK_STATUS.PS003.code) {
            if (confirm('업무 완료시 다른 수정사항은 반영되지 않습니다. 업무를 완료하시겠습니까?')) {
                completeTask({
                    workId: modModalData.workId,
                    authMap: modModalData.authMap
                });
            }
        } else {
            updateTask(modModalData);
        }
    }


    return (
        <>
            {
                isOpen && portalElement
                    ? createPortal((
                        <Modal
                            isOpen={isOpen}
                            close={() => onCloseHandler()}
                            title={title}
                            onClickConfirmHandler={() => onConfirmHandler()}
                            isUpdating={isUpdating || isCompleting}
                        >
                            <section className='tablet:w-[450px] mobile:w-[280px] max-h-[500px] mb-10 flex-col mt-5'>
                                <div className="space-y-5 mobile:space-y-3 mx-4 mobile:mx-0 mobile:text-sm">
                                    <TaskContent modalType={modalType}/>
                                    <TaskProgressStatus/>
                                    <TaskDate modalType={modalType}/>
                                    <TaskAssignedCrew modalType={modalType}/>
                                    <TaskContentDetail modalType={modalType}/>
                                </div>
                            </section>
                        </Modal>
                    ), portalElement as Element)
                    : null
            }
        </>
    );
}

export default TaskModModal;