'use client';

import {useResetRecoilState, useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";
import {taskAddModalDataStateStore, taskAddModalStateStore, taskModalState} from "@/store/project/task/TaskStateStore";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createTask as createTaskAPI, TaskCreateReqData} from "@/service/project/task";
import {TaskAddForm} from "@/app/project/@task/_utils/type";

function useCreateTask() {
    const setSnackbar = useSetRecoilState(snackbarState);
    const resetAddModalState = useResetRecoilState(taskAddModalStateStore);
    const resetAddModalData = useResetRecoilState(taskAddModalDataStateStore);

    const queryClient = useQueryClient();

    const {mutate: createTask, isPending: isCreating} = useMutation({
        mutationFn: (currentForm: TaskCreateReqData) => createTaskAPI(currentForm),
        onSuccess: async (res) => {
            if (res.result === "success") {
                setSnackbar({show: true, type: 'SUCCESS', content: '업무를 생성했습니다.'});
                await queryClient.invalidateQueries({queryKey: ['taskList']});
                resetAddModalData();
                resetAddModalState();
            } else {
                setSnackbar({show: true, type: 'ERROR', content: res.message});
            }
        },
        onError: (error) => {
            setSnackbar({show: true, type: 'ERROR', content: error.message});
        }
    });

    return {createTask, isCreating};
}

export default useCreateTask;