import React from 'react';
import Input from "@/components/ui/form/Input";
import {useRecoilState} from "recoil";
import {
    projectSettingInfoSelector,
    ProjectSettingInfoUpdField
} from "@/store/project/setting/ProjectSettingFormStateStore";
import {ProjectSettingInfoData} from "@/service/project/setting/info";
import FormRow from "@/components/ui/form/FormRow";

function ProjectName({initData}: { initData: ProjectSettingInfoData['projectName'] }) {
    const [projectName, setProjectName] = useRecoilState(projectSettingInfoSelector('projectName'));

    const value = projectName ? projectName as ProjectSettingInfoUpdField<'projectName'> : initData;

    return (
        <FormRow>
            <Input id="projectName"
                   label="프로젝트 이름"
                   placeholder="이름을 입력해주세요."
                   value={value}
                   onChange={(e) => setProjectName(e.target.value)}
            />
        </FormRow>
    );
}

export default ProjectName;