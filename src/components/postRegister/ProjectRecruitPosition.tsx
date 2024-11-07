import React from 'react';
import MultiPositionSelect from "@/components/postRegister/MultiPositionSelect";
import {useRecoilState} from "recoil";
import {postFieldSelector} from "@/store/register/RegisterPostStateStore";
import FormRow from "@/components/ui/form/FormRow";

function ProjectRecruitPosition() {
    const [{positionIds}, setPositionIds] = useRecoilState(postFieldSelector('positionIds'));

    return (
        <FormRow>
            <MultiPositionSelect positions={positionIds!}
                                 setPositions={(item) => setPositionIds({positionIds: item})}/>
        </FormRow>
    );
}

export default ProjectRecruitPosition;