import React, {useEffect} from 'react';
import {ProjectAuthMap} from "@/utils/type";
import ProjectName from "@/components/project/setting/info/ProjectName";
import ProjectSubject from "@/components/project/setting/info/ProjectSubject";
import ProjectDate from "@/components/project/setting/info/ProjectDate";
import ProjectSettingFormResetButton from "@/components/project/setting/info/ProjectSettingFormResetButton";
import ProjectSettingFormSaveButton from "@/components/project/setting/info/ProjectSettingFormSaveButton";
import useProjectInfoSummary, {isQueryDataReady} from "@/hooks/common/useProjectInfoSummary";
import {useResetRecoilState, useSetRecoilState} from "recoil";
import {
    projectSettingInfoSelector,
    projectSettingInfoStateStore
} from "@/store/project/setting/ProjectSettingFormStateStore";
import ProjectTechnologies from "@/components/project/setting/info/ProjectTechnologies";
import ProjectSettingInfoSkeleton from "@/components/project/setting/info/ProjectSettingInfoSkeleton";
import SettingContainer from "@/components/project/setting/SettingContainer";
import SettingTitle from "@/components/project/setting/SettingTitle";
import SettingBody from "@/components/project/setting/SettingBody";
import {bigIntToString} from "@/utils/common";

function ProjectSettingInfo({projectId, authMap}: { projectId: bigint, authMap: ProjectAuthMap }) {
    const setProjectSettingProjectId = useSetRecoilState(projectSettingInfoSelector("projectId"));
    const setProjectSettingAuthMap = useSetRecoilState(projectSettingInfoSelector("authMap"));
    const resetProjectSettingInfoState = useResetRecoilState(projectSettingInfoStateStore);

    const {
        data,
        error,
        isPending,
        isRefetching,
        isError,
        isRefetchError
    } = useProjectInfoSummary(bigIntToString(projectId));


    useEffect(() => {
        // 마운트시 projectId, authMap 상태 초기화
        setProjectSettingProjectId(projectId);
        setProjectSettingAuthMap(authMap.code);

        // 언마운트시 프로젝트정보 store 초기화
        return () => resetProjectSettingInfoState();
    }, [projectId, authMap, setProjectSettingProjectId, setProjectSettingAuthMap, resetProjectSettingInfoState]);


    const isDataReady = isQueryDataReady(isPending || isRefetching, isError || isRefetchError, data);

    let settingBody = <></>;
    if (!isDataReady) {
        if (isPending || isRefetching) settingBody = <ProjectSettingInfoSkeleton/>;
        if (isError || isRefetchError) settingBody = <div>데이터 조회에 실패했습니다.</div>;
    } else {
        const {projectName, projectSubject, startDate, endDate, technologyStacks} = data.data!;
        settingBody = (
            <SettingBody>
                <ProjectName initData={projectName}/>
                <ProjectSubject initData={projectSubject}/>
                <ProjectDate initStartDate={startDate} initEndDate={endDate}/>
                <ProjectTechnologies initData={technologyStacks}/>
            </SettingBody>
        );
    }


    return (
        <SettingContainer>
            <SettingTitle>프로젝트 정보</SettingTitle>
            {settingBody}
            <div className="w-full my-4 flex items-center justify-center space-x-2">
                <ProjectSettingFormResetButton/>
                <ProjectSettingFormSaveButton initData={data!.data!}/>
            </div>
        </SettingContainer>
    );
}

export default ProjectSettingInfo;