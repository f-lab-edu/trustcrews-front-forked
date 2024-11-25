"use client";

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {changeRecruitmentStatus as changeRecruitmentStatusAPI} from "@/service/post/post";
import {isEqual} from "lodash";
import useSnackbar from "@/hooks/common/useSnackbar";
import {useResetRecoilState} from "recoil";
import {confirmModalState} from "@/store/CommonStateStore";

export default function useChangeRecruitStatus(postId:bigint){
    const queryClient = useQueryClient();
    const resetModalState = useResetRecoilState(confirmModalState);
    const {setSuccessSnackbar, setErrorSnackbar} = useSnackbar();

    const { mutate: changeRecruitStatus, isPending } = useMutation({
        mutationFn: () => changeRecruitmentStatusAPI(BigInt(postId)),
        onSuccess: (data) => {
            const { message, result } = data;
            if (isEqual(result, "success")) {
                setSuccessSnackbar(message);
                resetModalState();

                queryClient.invalidateQueries({ queryKey: ['postInfo', postId.toString()] });
            } else {
                setErrorSnackbar(message);
            }
        },
        onError: (err) => {
            console.log("err", err);
        }
    });

    return {changeRecruitStatus, isUpdating: isPending}
}