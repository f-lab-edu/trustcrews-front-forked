'use client';
import React, {Fragment} from 'react';
import {Menu, Transition} from "@headlessui/react";
import {IoEllipsisVertical} from "@react-icons/all-files/io5/IoEllipsisVertical";
import {classNames} from "@/utils/common";
import {TaskItem} from "@/app/project/@task/_utils/type";
import {useSetRecoilState} from "recoil";
import {taskModModalDataStateStore, taskModModalStateStore} from "@/store/project/task/TaskStateStore";
import useDeleteTask from "@/hooks/project/task/useDeleteTask";
import {TaskModifyReqData} from "@/service/project/task";
import {TASK_STATUS} from "@/app/project/@task/_utils/constant";
import {ProjectAuthMap} from "@/utils/type";


function TaskCardMenu({taskItem, authMap}: { taskItem: TaskItem, authMap: ProjectAuthMap }) {
    const {
        content,
        workId,
        startDate,
        endDate,
        progressStatus,
        milestoneId,
        projectId,
        assignedUser,
        contentDetail
    } = taskItem;
    const {deleteTask, isDeleting} = useDeleteTask();
    const setTaskModalState = useSetRecoilState(taskModModalStateStore);
    const setTaskModalData = useSetRecoilState(taskModModalDataStateStore);


    function onClickUpdateHandler() {
        const updateForm: TaskModifyReqData = {
            projectId,
            milestoneId,
            content,
            progressStatus: progressStatus.code,
            startDate,
            endDate,
            assignedUserId: assignedUser!.projectMemberId,
            contentDetail,
            workId,
            authMap: authMap.code
        };

        setTaskModalState(prev => ({...prev, isOpen: true}));
        setTaskModalData(updateForm);
    }

    /**
     * 업무 삭제 click
     */
    function onClickDeleteCardHandler() {
        if (confirm("업무를 삭제하시겠습니까?")) {
            deleteTask({workId, authMap: authMap.code});
        }
    }


    return (
        <Menu as="div" className="relative flex-shrink-0 text-center">
            <div>
                <Menu.Button
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-gray-500 hover:text-gray-600 focus:outline-none">
                    <span className="sr-only">업무 메뉴</span>
                    <IoEllipsisVertical className="h-5 w-5" aria-hidden="true"/>
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute right-2 z-10 mt-1 tablet:min-w-[60px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1 ">
                        {
                            progressStatus.code !== TASK_STATUS.PS003.code
                            && <Menu.Item key='modify'>
                                {({active}) => (
                                    <a
                                        href="javascript;"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onClickUpdateHandler();
                                        }}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 tablet:text-[16px] mobile:text-sm'
                                        )}
                                    >
                                        수정
                                    </a>
                                )}
                            </Menu.Item>
                        }
                        <Menu.Item key='delete'>
                            {({active}) => (
                                <a
                                    href="javascript;"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onClickDeleteCardHandler();
                                    }}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 tablet:text-[16px] mobile:text-sm'
                                    )}
                                >
                                    삭제
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default TaskCardMenu;