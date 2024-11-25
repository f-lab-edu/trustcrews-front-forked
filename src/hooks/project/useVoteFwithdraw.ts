import {VoteFWReqData} from "@/service/project/vote/type";
import {voteForProjectFWithdraw as voteForProjectFWithdrawAPI} from "@/service/project/vote/fwithdraw";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";


export default function useVoteFwithdraw() {
    const setSnackBar = useSetRecoilState(snackbarState);
    const queryClient = useQueryClient();
    const {mutate: voteForProjectFWithdraw, isPending: isUpdating} = useMutation({
        mutationFn: (reqData: VoteFWReqData) => voteForProjectFWithdrawAPI(reqData),
        onSuccess: async (data) => {
            if (data.result === "success") {
                setSnackBar({show: true, content: "투표를 완료했습니다.", type: "SUCCESS"});
                await queryClient.invalidateQueries({queryKey: ['vAlertFWDetailData']})
            } else {
                setSnackBar({show: true, content: data.message, type: 'ERROR'});
            }
        }
    });

    return {voteForProjectFWithdraw, isUpdating};
}