import React from 'react';
import Button from "@/components/ui/Button";
import {useRecoilState} from "recoil";
import {CrewFWModalState, crewFWModalStateStore} from "@/store/project/alert/modal/CrewFWModalStateStore";
import {ProjectMemberProfile} from "@/utils/type";
import ButtonStyleSkeleton from "@/components/ui/skeleton/ButtonStyleSkeleton";
import {bigIntToString} from "@/utils/common";
import useCurrentUserPMAuth from "@/hooks/project/useCurrentUserPMAuth";

function CrewFwButton({projectMemberInfo}: { projectMemberInfo: ProjectMemberProfile }) {
    const [createFWModalState, setCreateFWModalState] = useRecoilState(crewFWModalStateStore);

    const {projectMemberId, projectId, projectMemberAuth} = projectMemberInfo;

    const {currentUserPMAuth, isFetchingCurrentUserPMAuth} = useCurrentUserPMAuth(bigIntToString(projectId));

    if (isFetchingCurrentUserPMAuth) return <ButtonStyleSkeleton size='md' className='w-[80px] h-[30px] my-3 '/>;

    const onClickCrewFWButtonHandler = () => {
        const updateModalState: CrewFWModalState = {
            title: createFWModalState.title,
            isOpen: true,
            createData: {
                project_id: projectId,
                fw_member_id: projectMemberId,
                fw_member_auth: projectMemberAuth.code,
                authMap: currentUserPMAuth!.code,
                reason: createFWModalState.createData.reason
            }
        }
        setCreateFWModalState(updateModalState);
    }

    return (
        <Button type='button' theme='danger' size='md' onClickHandler={onClickCrewFWButtonHandler}>
            강제탈퇴 투표
        </Button>
    );
}

export default CrewFwButton;