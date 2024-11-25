'use client';

import {useResetRecoilState, useSetRecoilState} from "recoil";
import {
    milestoneActiveStateStore,
    milestoneModDataStateStore,
    milestoneModModalStateStore
} from "@/store/project/task/MilestoneStateStore";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {MilestoneModReqData, updateMilestone as updateMilestoneAPI} from "@/service/project/milestone";
import {snackbarState} from "@/store/CommonStateStore";

export default function useUpdateMilestone() {
    const setSnackBar = useSetRecoilState(snackbarState);
    const resetMilestoneModDataState = useResetRecoilState(milestoneModDataStateStore);
    const resetMilestoneModalState = useResetRecoilState(milestoneModModalStateStore);
    const resetActiveMilestone = useResetRecoilState(milestoneActiveStateStore);

    const queryClient = useQueryClient();

    const {mutate: updateMilestone, isPending: isUpdating} = useMutation({
        mutationFn: (reqData:MilestoneModReqData) => updateMilestoneAPI(reqData),
        onSuccess: async (data) => {
            if (data.result === 'success') {
                resetMilestoneModDataState();
                resetMilestoneModalState();
                resetActiveMilestone();
                await queryClient.invalidateQueries({queryKey: ['milestoneList']});
                setSnackBar({show: true, content: '마일스톤을 수정했습니다.', type: 'SUCCESS'});
            } else {
                setSnackBar({show: true, content: data.message, type: 'ERROR'});
            }
        },
        onError: (err) => {
            setSnackBar({show: true, content: err.message, type: 'ERROR'});
        }
    });

    return {updateMilestone, isUpdating};
}