import React from 'react';
import {
    ProjectSettingBoardData,
    ProjectSettingBoardUpdReqData,
    updateProjectSettingBoard as updateProjectSettingBoardAPI
} from "@/service/project/setting/board";
import Button from "@/components/ui/Button";
import {useQueryClient} from "@tanstack/react-query";
import {projectSettingBoardInfoStateStore} from "@/store/project/setting/ProjectSettingFormStateStore";
import {useRecoilValue} from "recoil";
import useSnackbar from "@/hooks/common/useSnackbar";
import {useMutation} from "@tanstack/react-query";

function ProjectSettingBoardInfoSaveBtn({initData}: { initData: ProjectSettingBoardData }) {
    const queryClient = useQueryClient();
    const projectSettingBoardInfo = useRecoilValue(projectSettingBoardInfoStateStore);
    const {setSuccessSnackbar, setErrorSnackbar} = useSnackbar();

    const {mutate: updateProjectSettingBoard, isPending} = useMutation({
        mutationFn: (reqData: ProjectSettingBoardUpdReqData) => updateProjectSettingBoardAPI(reqData),
        onSuccess: async (data) => {
            const {message, result} = data;
            if (result === "success") {
                const invalidateSettingBoard = queryClient.invalidateQueries({queryKey: ['projectSettingBoardInfo']});
                const invalidatePostInfo = queryClient.invalidateQueries({queryKey: ['postInfo']});
                await Promise.all([invalidateSettingBoard, invalidatePostInfo]);
                setSuccessSnackbar("팀 프로젝트 게시글을 수정했습니다.");
            } else {
                setErrorSnackbar(message);
            }
        },
        onError: (error) => {
            setErrorSnackbar(error.message);
            console.error(error.cause);
        }
    });

    const onClickSaveButtonHandler = () => {
        const {
            title: initTitle,
            boardPositions: initBoardPositions,
            contact: initContact,
            content: initContent,
            recruitmentStatus: initRecruitmentStatus,
            boardId: initBoardId
        } = initData;

        const {
            projectId,
            authMap,
            title,
            positionIds,
            contact,
            content,
            recruitmentStatus
        } = projectSettingBoardInfo;

        const reqData: ProjectSettingBoardUpdReqData = {
            projectId,
            boardId: initBoardId,
            authMap,
            title: title ? title : initTitle,
            positionIds: positionIds.length > 0 ? positionIds : initBoardPositions.map(v => v.position.positionId),
            contact: contact ? contact : initContact,
            content: content ? content : initContent,
            recruitmentStatus: recruitmentStatus !== null ? recruitmentStatus : initRecruitmentStatus
        };

        updateProjectSettingBoard(reqData);
    }

    return (
        <Button
            size="md"
            onClickHandler={onClickSaveButtonHandler}
            disabled={isPending}
            className={`${isPending && '!bg-gray-400 !text-white'}`}
        >
            저장
        </Button>
    );
}

export default ProjectSettingBoardInfoSaveBtn;