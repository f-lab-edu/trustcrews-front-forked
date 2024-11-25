import {useMutation, useQueryClient} from "@tanstack/react-query";
import {taskModalState, taskModModalDataStateStore, taskModModalStateStore} from "@/store/project/task/TaskStateStore";
import {TaskModifyReqData, updateTask as updateTaskAPI} from "@/service/project/task";
import {useResetRecoilState, useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";
import {TaskModifyForm} from "@/app/project/@task/_utils/type";
import useSnackbar from "@/hooks/common/useSnackbar";

function useUpdateTask() {
    const setSnackbar = useSetRecoilState(snackbarState);
    const {setSuccessSnackbar, setErrorSnackbar} = useSnackbar();
    const resetTaskModModalState = useResetRecoilState(taskModModalStateStore);
    const resetTaskModModalData = useResetRecoilState(taskModModalDataStateStore);

    const queryClient = useQueryClient();

    const {mutate: updateTask, isPending: isUpdating} = useMutation({
        mutationFn: (currentForm: TaskModifyReqData) => updateTaskAPI(currentForm),
        onSuccess: async (res, variables, context) => {
            if (res.result === "success") {
                await queryClient.invalidateQueries({queryKey: ['taskList']});
                resetTaskModModalState();
                resetTaskModModalData();
                setSuccessSnackbar('업무를 수정했습니다.');
            } else {
                setErrorSnackbar(res.message);
            }
        },
        onError: (error) => {
            setSnackbar({show: true, type: 'ERROR', content: error.message});
        }
    });

    return {updateTask, isUpdating};

}

export default useUpdateTask;