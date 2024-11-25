'use client';

import React, {useState} from 'react';
import Button from "@/components/ui/Button";
import {ProjectMemberProfile, ResponseBody} from "@/utils/type";
import {useQueryClient} from "@tanstack/react-query";
import {withdrawProject, WithdrawReqDto} from "@/service/project/crews";
import {useRouter} from "next/navigation";
import useSnackbar from "@/hooks/common/useSnackbar";

function CrewOutButton({projectMemberInfo}: { projectMemberInfo: ProjectMemberProfile }) {
    const {setSuccessSnackbar, setErrorSnackbar} = useSnackbar();
    const {projectMemberAuth, projectMemberId, projectId} = projectMemberInfo;
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();
    const queryClient = useQueryClient();

    const onClickCrewOutHandler = async () => {
        if (confirm("프로젝트를 탈퇴하시겠습니까?")) {

            const reqData: WithdrawReqDto = {
                projectId,
                wMemberId: projectMemberId,
                wMemberAuth: projectMemberAuth.code
            };

            setIsPending(true);
            let res: ResponseBody<null>;
            try {
                res = await withdrawProject(reqData);
                if (res.result === 'success') {
                    await queryClient.invalidateQueries({queryKey: ['noticeList']});
                    setSuccessSnackbar("프로젝트를 탈퇴했습니다.")
                    router.replace("/");
                } else {
                    setErrorSnackbar(res.message)
                }
            } catch (e: unknown) {
                setErrorSnackbar((e as Error).message);
            } finally {
                setIsPending(false);
            }

        }
    }

    return (
        <Button type='button' theme='black' size='md' onClickHandler={onClickCrewOutHandler} disabled={isPending}>
            프로젝트 탈퇴
        </Button>
    );
}

export default CrewOutButton;