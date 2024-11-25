'use client';

import {useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteTask as deleteTaskAPI, TaskDeleteReqData} from "@/service/project/task";

export default function useDeleteTask(){
    const setSnackbar = useSetRecoilState(snackbarState);

    const queryClient = useQueryClient();

    const {mutate: deleteTask, isPending: isDeleting} = useMutation({
        mutationFn: (reqData: TaskDeleteReqData) => deleteTaskAPI(reqData),
        onSuccess: async (res) => {
            if (res.result === 'success') {
                await queryClient.invalidateQueries({queryKey: ['taskList']});
                setSnackbar({show: true, type: 'SUCCESS', content: '업무를 삭제했습니다'});
            } else {
                setSnackbar({show: true, type: 'ERROR', content: res.message});
            }
        },
        onError: (error) => {
            console.error(error.cause);
            setSnackbar({show: true, type: 'ERROR', content: error.message});
        }
    });

    return {deleteTask, isDeleting};
}