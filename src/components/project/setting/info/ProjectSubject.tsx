import React from 'react';
import Input from "@/components/ui/form/Input";
import {useRecoilState} from "recoil";
import {
    projectSettingInfoSelector,
    ProjectSettingInfoUpdField
} from "@/store/project/setting/ProjectSettingFormStateStore";
import {ProjectSettingInfoData} from "@/service/project/setting/info";
import FormRow from "@/components/ui/form/FormRow";

function ProjectSubject({initData}: { initData: ProjectSettingInfoData['projectSubject'] }) {
    const [projectSubject, setProjectSubject] = useRecoilState(projectSettingInfoSelector('projectSubject'));

    const value = projectSubject ? projectSubject as ProjectSettingInfoUpdField<'projectSubject'> : initData;

    return (
        <FormRow>
            <Input
                id="projectSubject"
                label="프로젝트 주제"
                placeholder="주제를 입력해주세요."
                value={value}
                onChange={(e) => setProjectSubject(e.target.value)}
            />
        </FormRow>
    );
}

export default ProjectSubject;