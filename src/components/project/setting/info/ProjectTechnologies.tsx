import React from 'react';
import TechStackSelect from "@/components/ui/form/TechStackSelect";
import {TechStackValueType} from "@/utils/type";
import {ProjectSettingInfoData} from "@/service/project/setting/info";
import {useRecoilState} from "recoil";
import {
    projectSettingInfoSelector,
    ProjectSettingInfoUpdField
} from "@/store/project/setting/ProjectSettingFormStateStore";
import FormRow from "@/components/ui/form/FormRow";

function ProjectTechnologies({initData}: { initData: ProjectSettingInfoData['technologyStacks'] }) {
    const [technologyIds, setTechnologyIds] = useRecoilState(projectSettingInfoSelector('technologyIds'));

    const techStacks = (technologyIds as ProjectSettingInfoUpdField<'technologyIds'>).length > 0
        ? (technologyIds as ProjectSettingInfoUpdField<'technologyIds'>)
        : initData.map(v => v.techStackId);

    return (
        <FormRow>
            <TechStackSelect
                techStacks={techStacks}
                setTechStacks={(item: readonly TechStackValueType[]) => setTechnologyIds([...item])}
                label="기술 스택"
                placeholder="기술 스택을 선택해주세요."
            />
        </FormRow>
    );
}

export default ProjectTechnologies;