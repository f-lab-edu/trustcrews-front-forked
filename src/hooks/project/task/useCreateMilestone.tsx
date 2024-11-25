'use client';
import {useResetRecoilState, useSetRecoilState} from "recoil";
import {milestoneAddDataStateStore, milestoneAddModalStateStore} from "@/store/project/task/MilestoneStateStore";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createMilestone as createMilestoneAPI, MilestoneAddReqData} from "@/service/project/milestone";
import {snackbarState} from "@/store/CommonStateStore";

export default function useCreateMilestone() {
    const setSnackbar = useSetRecoilState(snackbarState);
    const resetMilestoneAddModalState = useResetRecoilState(milestoneAddModalStateStore);
    const resetMilestoneAddData = useResetRecoilState(milestoneAddDataStateStore);

    const queryClient = useQueryClient();

    const {mutate: createMilestone, isPending: isCreating} = useMutation({
        mutationFn: (reqData: MilestoneAddReqData) => createMilestoneAPI(reqData),
        onSuccess: async (data, variables, context) => {
            if (data.result === 'success') {
                setSnackbar({show: true, content: '마일스톤을 생성했습니다.', type: 'SUCCESS'});
                resetMilestoneAddModalState();
                resetMilestoneAddData();
                await queryClient.invalidateQueries({queryKey: ['milestoneList']});
            } else {
                setSnackbar({show: true, content: data.message, type: 'ERROR'});
            }

        },
        onError: (err) => {
            setSnackbar({show: true, content: err.message, type: 'ERROR'});
        }
    });

    return {createMilestone, isCreating};
}