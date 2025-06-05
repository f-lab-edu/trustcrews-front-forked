import Button from '@/shared/ui/Button';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  CrewFWModalState,
  crewFWModalStateStore,
  DEFAULT_FW_MODAL_STATE,
} from '@/store/projectDetail/crew/crewDetail/crewFW/CrewFWModalStateStore';
import { bigIntToString } from '@/shared/utils/stringUtils';
import { projectManageAuthStateStore } from '@/store/projectDetail/config/pmAuth/ProjectManageAuthStateStore';
import { ProjectCrewProfileInfo } from '@/features/projectDetail/crewDetail/crewProfile/api/getCrewDetail';

const { title: DEFALUT_TITLE } = DEFAULT_FW_MODAL_STATE;

const CrewFwButton = ({ crewInfo }: { crewInfo: ProjectCrewProfileInfo }) => {
  const { code: userPMAuth } = useRecoilValue(projectManageAuthStateStore);
  const setCrewFWModalState = useSetRecoilState(crewFWModalStateStore);

  const {
    crewId,
    projectId,
    crewPMAuth: { code: crewPMAuth },
  } = crewInfo;

  const handleClickCrewFWButton = () => {
    const updateModalState: CrewFWModalState = {
      title: DEFALUT_TITLE,
      isOpen: true,
      projectId: bigIntToString(projectId),
      crewId: bigIntToString(crewId),
      crewPMAuth,
      userPMAuth,
    };
    setCrewFWModalState(updateModalState);
  };

  return (
    <Button
      type='button'
      theme='danger'
      size='md'
      onClick={handleClickCrewFWButton}
    >
      강제탈퇴 투표
    </Button>
  );
};

export default CrewFwButton;
