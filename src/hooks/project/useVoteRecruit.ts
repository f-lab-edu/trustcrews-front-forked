import {VoteRecruitReqData} from "@/service/project/vote/type";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {voteForProjectRecruit as voteForProjectRecruitAPI} from "@/service/project/vote/recruit";
import {useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";

export default function useVoteRecruit() {
    const setSnackBar = useSetRecoilState(snackbarState);
    const queryClient = useQueryClient();

    const {mutate: voteForProjectRecruit, isPending: isUpdating} = useMutation({
        mutationFn: (reqData: VoteRecruitReqData) => voteForProjectRecruitAPI(reqData),
        onSuccess: async (data) => {
            if (data.result === "success") {
                await queryClient.invalidateQueries({queryKey: ["vAlertRecruitDetailData"]});
                setSnackBar({show: true, content: "투표를 완료했습니다.", type: "SUCCESS"});
            } else {
                setSnackBar({show: true, content: data.message, type: "ERROR"});
            }
        }
    });

    return {voteForProjectRecruit, isUpdating};
}