import React from 'react';
import Input from "@/components/ui/form/Input";
import {projectFieldSelector} from "@/store/register/RegisterPostStateStore";
import {useRecoilState} from "recoil";
import FormRow from "@/components/ui/form/FormRow";

function ProjectSubject_Reg() {
    const [{subject}, setSubject] = useRecoilState(projectFieldSelector('subject'));
    return (
        <FormRow className="pc:place-self-center">
            <Input
                id="projectSubject"
                label="프로젝트 주제"
                value={subject}
                onChange={(e) => setSubject({subject: e.target.value})}
            />
        </FormRow>

    );
}

export default ProjectSubject_Reg;