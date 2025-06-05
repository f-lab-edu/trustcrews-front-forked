import ConfigSummary from '@/features/projectDetail/config/layouts/ConfigSummary';
import ConfigContainer from '@/features/projectDetail/config/layouts/ConfigContainer';
import Button from '@/shared/ui/Button';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/navigation';
import { projectIdState } from '@/store/projectDetail/ProjectIdStateStore';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { useEndProject } from '@/features/projectDetail/config/api/project/endProject';

const EndProject = () => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const router = useRouter();
  const projectId = useRecoilValue(projectIdState);

  const { mutate: endProject, isPending: isUpdating } = useEndProject(
    numStrToBigInt(projectId),
    {
      onSuccess: (res) => {
        setSuccessSnackbar(res.message);
        router.replace('/');
      },
      onError: (res) => setErrorSnackbar(res.message),
    },
  );

  const handleClickEndButton = async () => {
    if (confirm('프로젝트를 종료하시겠습니까?')) {
      endProject();
    }
  };
  return (
    <ConfigContainer>
      <ConfigSummary>프로젝트 종료</ConfigSummary>
      <div className='w-[380px] tablet:w-full flex flex-col items-start justify-center'>
        <p className='text-danger font-medium mb-5'>
          &#8251; 프로젝트 종료시, 획득한 신뢰점수를 제외한 프로젝트와 관련된
          모든 정보가 삭제됩니다. 반드시 멤버들과 상의후 종료해주세요.
        </p>
        <Button
          theme='danger'
          size='md'
          onClick={handleClickEndButton}
          disabled={isUpdating}
        >
          프로젝트 종료
        </Button>
      </div>
    </ConfigContainer>
  );
};

export default EndProject;
