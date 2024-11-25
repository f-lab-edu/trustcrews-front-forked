'use client';

import React from 'react';
import Button from "@/components/ui/Button";
import {useRecoilValue} from "recoil";
import {projectSettingInfoStateStore} from "@/store/project/setting/ProjectSettingFormStateStore";
import useSnackbar from "@/hooks/common/useSnackbar";
import {
    ProjectSettingInfoData,
    ProjectSettingInfoUpdReqData,
    updateProjectSettingInfo as updateProjectSettingInfoAPI
} from "@/service/project/setting/info";
import {useMutation, useQueryClient} from "@tanstack/react-query";


function ProjectSettingFormSaveButton({initData}: { initData: ProjectSettingInfoData }) {
    const queryClinet = useQueryClient();
    const projectSettingInfo = useRecoilValue(projectSettingInfoStateStore);
    const {setSuccessSnackbar, setErrorSnackbar} = useSnackbar();

    const {mutate: updateProjectSettingInfo, isPending} = useMutation({
        mutationFn: (reqData: ProjectSettingInfoUpdReqData) => updateProjectSettingInfoAPI(reqData),
        onSuccess: async (data) => {
            const {message, result} = data;
            if (result === 'success') {
                await queryClinet.invalidateQueries({queryKey: ['projectInfoSummary']});
                setSuccessSnackbar("프로젝트 정보를 수정했습니다.");
            } else {
                setErrorSnackbar(message);
            }
        },
        onError: (err) => {
            setErrorSnackbar(err.message);
            console.error(err.cause);
        }
    })

    const onClickSettingSaveButtonHandler = () => {
        const {
            projectName: initProjectName,
            projectSubject: initProjectSubject,
            startDate: initStartDate,
            endDate: initEndDate,
            technologyStacks: initTechnologyStacks
        } = initData;

        const {
            projectId,
            authMap,
            projectName,
            projectSubject,
            startDate,
            endDate,
            technologyIds
        } = projectSettingInfo;

        const reqData: ProjectSettingInfoUpdReqData = {
            projectId: projectId,
            authMap,
            projectName: projectName ? projectName : initProjectName,
            projectSubject: projectSubject ? projectSubject : initProjectSubject,
            startDate: startDate ? startDate : initStartDate,
            endDate: endDate ? endDate : initEndDate,
            technologyIds: technologyIds.length > 0 ? technologyIds : initTechnologyStacks.map(v => v.techStackId)
        };

        updateProjectSettingInfo(reqData);
    }


    return (
        <Button
            size="md"
            onClickHandler={onClickSettingSaveButtonHandler}
            disabled={isPending}
            className={`${isPending && '!bg-gray-400 !text-white'}`}
        >
            저장
        </Button>
    );
}

export default ProjectSettingFormSaveButton;