import React from 'react';
import {useRecoilValue, useResetRecoilState} from "recoil";
import {taskAddModalDataStateStore, taskAddModalStateStore, TaskModalType} from "@/store/project/task/TaskStateStore";
import useCreateTask from "@/hooks/project/task/useCreateTask";
import useModalPortalElement from "@/hooks/common/useModalPortalElement";
import {createPortal} from "react-dom";
import Modal from "@/components/ui/Modal";
import TaskDate from "@/components/project/work/work/modal/TaskDate";
import TaskAssignedCrew from "@/components/project/work/work/modal/TaskAssignedCrew";
import TaskContentDetail from "../taskContentDetail/TaskContentDetail";
import TaskContent from "@/components/project/work/work/modal/TaskContent";

const modalType:TaskModalType = 'add';
function TaskAddModal() {
    const {isOpen, title} = useRecoilValue(taskAddModalStateStore);
    const [portalElement, setPortalElement] = useModalPortalElement(isOpen);

    const addModalData = useRecoilValue(taskAddModalDataStateStore);
    const resetAddModalData = useResetRecoilState(taskAddModalDataStateStore);
    const resetAddModalState = useResetRecoilState(taskAddModalStateStore);

    const {createTask, isCreating} = useCreateTask();

    function onCloseHandler(){
        resetAddModalData();
        resetAddModalState();
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
                            onClickConfirmHandler={() => createTask(addModalData)}
                            isUpdating={isCreating}
                        >
                            <section className='tablet:w-[450px] mobile:w-[280px] max-h-[500px] mb-10 flex-col mt-5'>
                                <div className="space-y-5 mobile:space-y-3 mx-4 mobile:mx-0 mobile:text-sm">
                                    <TaskContent modalType={modalType}/>
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

export default TaskAddModal;