'use client';

import Button from '@/shared/ui/Button';
import { useRouter } from 'next/navigation';
import useSnackbar from '@/shared/hooks/useSnackbar';
import {
  LeaveProjectInput,
  useLeaveProject,
} from '@/features/projectDetail/crewDetail/crewOut/api/leaveProject';
import { ProjectCrewProfileInfo } from '@/features/projectDetail/crewDetail/crewProfile/api/getCrewDetail';

type CrewOutButtonProps = {
  crewInfo: ProjectCrewProfileInfo;
};

const CrewOutButton = ({ crewInfo }: CrewOutButtonProps) => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const {
    crewPMAuth: { code: crewPMAuth },
    crewId,
    projectId,
  } = crewInfo;
  const router = useRouter();

  const { mutate: leaveProject, isPending } = useLeaveProject({
    onSuccess: (res) => {
      setSuccessSnackbar(res.message);
      router.replace('/');
    },
    onError: (error) => setErrorSnackbar(error.message),
  });

  const handleClickLeaveButton = () => {
    if (confirm('프로젝트를 탈퇴하시겠습니까?')) {
      const reqData: LeaveProjectInput = {
        projectId,
        crewId,
        crewPMAuth,
      };
      leaveProject(reqData);
    }
  };

  return (
    <Button
      type='button'
      theme='primaryHollow'
      size='lg'
      onClick={handleClickLeaveButton}
      disabled={isPending}
    >
      프로젝트 탈퇴
    </Button>
  );
};

export default CrewOutButton;
