import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useResetRecoilState} from "recoil";
import useSnackbar from "@/hooks/common/useSnackbar";
import {taskModalState, taskModModalDataStateStore, taskModModalStateStore} from "@/store/project/task/TaskStateStore";
import {workComplete, WorkCompleteRequestDto} from "@/service/project/confirm";

export default function useCompleteTask() {
    const {setSuccessSnackbar, setErrorSnackbar} = useSnackbar();
    const resetModModalState = useResetRecoilState(taskModModalStateStore);
    const resetModModalData = useResetRecoilState(taskModModalDataStateStore);

    const queryClient = useQueryClient();

    const {mutate: completeTask, isPending: isUpdating} = useMutation({
        mutationFn: (reqData: WorkCompleteRequestDto) => workComplete(reqData),
        onSuccess: async (res) => {
            if (res.result === "success") {
                await queryClient.invalidateQueries({queryKey: ['taskList']});
                resetModModalState();
                resetModModalData();
                setSuccessSnackbar('업무를 완료했습니다.');
            } else {
                setErrorSnackbar(res.message);
            }
        },
        onError: (error) => {
            setErrorSnackbar(error.message);
        }
    });

    return {completeTask, isUpdating};
}