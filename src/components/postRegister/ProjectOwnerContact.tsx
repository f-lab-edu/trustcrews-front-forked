import React from 'react';
import Input from "@/components/ui/form/Input";
import {useRecoilState} from "recoil";
import {postFieldSelector} from "@/store/register/RegisterPostStateStore";
import FormRow from "@/components/ui/form/FormRow";

function ProjectOwnerContact() {
    const [{contact}, setContact] = useRecoilState(postFieldSelector('contact'));

    return (
        <FormRow>
            <Input id="contact"
                   label="연락 방법 (오픈 카톡 링크 / 이메일 / 구글 폼 주소)"
                   value={contact}
                   onChange={(e) => setContact({contact: e.target.value})}
            />
        </FormRow>
    );
}

export default ProjectOwnerContact;