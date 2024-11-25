'use client';

import {useMutation} from "@tanstack/react-query";
import {isEqual} from "lodash";
import useSnackbar from "@/hooks/common/useSnackbar";
import {useResetRecoilState} from "recoil";
import {confirmModalState} from "@/store/CommonStateStore";
import {applyProject} from "@/service/project/apply";

export default function useJoinProject(){
    const resetModalState = useResetRecoilState(confirmModalState);
    const {setSuccessSnackbar, setErrorSnackbar} = useSnackbar();

    const { mutate: joinProject, isPending } = useMutation({
        mutationFn: ({projectId, positionId}:{projectId:bigint, positionId: bigint}) => applyProject(projectId, positionId),
        onSuccess: async (data) => {
            const { message, result } = data;
            if (isEqual(result, "success")) {
                setSuccessSnackbar("프로젝트에 지원했습니다.");
                resetModalState();
            } else {
                setErrorSnackbar(message);
            }
        },
        onError: (err) => {
            console.log("err", err);
        }
    });

    return {joinProject, isUpdating:isPending};
}