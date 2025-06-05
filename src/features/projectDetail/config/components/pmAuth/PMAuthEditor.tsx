import { useState } from 'react';
import Avatar from '@/shared/ui/Avatar';
import Badge from '@/shared/ui/Badge';
import Button from '@/shared/ui/Button';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { useRecoilValue } from 'recoil';
import { projectIdState } from '@/store/projectDetail/ProjectIdStateStore';
import { ZodError } from 'zod';
import SelectSkeleton from '@/shared/ui/skeleton/SelectSkeleton';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import { projectManageAuthStateStore } from '@/store/projectDetail/config/pmAuth/ProjectManageAuthStateStore';
import {
  UpdatePMAuthConfigInput,
  updatePMAuthConfigInputSchema,
  useUpdatePMAuthConfig,
} from '@/features/projectDetail/config/api/pmAuth/updatePMAuthConfig';
import PMAuthSelector from '@/features/pmAuth/components/PMAuthSelector';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';
import { ProjectCrew } from '@/types/data/projectDetail/crew/projectCrew';

type CrewAuthRowProps = {
  crew: ProjectCrew;
};

const PMAuthEditor = ({ crew }: CrewAuthRowProps) => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const { code: userPMAuth } = useRecoilValue(projectManageAuthStateStore);
  const projectId = useRecoilValue(projectIdState);
  const { crewPMAuth: initCrewAuth, user, position, crewId } = crew;

  const [auth, setAuth] = useState(() => ({
    name: initCrewAuth.name,
    value: initCrewAuth.code,
  }));

  const { mutate: updateCrewPMAuth } = useUpdatePMAuthConfig(
    numStrToBigInt(projectId),
    crewId,
    userPMAuth,
    {
      onSuccess: (res) => setSuccessSnackbar(res.message),
      onError: (error) => setErrorSnackbar(error.message),
    },
  );

  const handleClickSaveButton = () => {
    const data: UpdatePMAuthConfigInput = {
      crewPMAuth: auth.value,
    };

    try {
      updatePMAuthConfigInputSchema.parse(data);
    } catch (e) {
      if (e instanceof ZodError) setErrorSnackbar(e.errors[0].message);
      return;
    }

    updateCrewPMAuth(data);
  };

  return (
    <tr>
      <td className='tablet:w-[40%] mobile:w-[20%] whitespace-nowrap py-5 pl-4 pr-3 text-base'>
        <div className=' flex items-center'>
          <div className='h-11 w-11 flex-shrink-0 mobile:hidden'>
            <Avatar
              alt='크루 아바타 이미지'
              size='xs'
              src={user.profileImgSrc}
            />
          </div>
          <div className='ml-4 mobile:ml-0'>
            <div className='font-medium text-gray-900'>{user.nickname}</div>
          </div>
          <div className='ml-3 mobile:ml-2'>
            <Badge text={position.positionName} size='sm' />
          </div>
        </div>
      </td>
      <td className='max-w-[30%] whitespace-nowrap px-3 py-5 text-sm text-gray-500'>
        <div className=' flex items-center'>
          <FieldQueryBoundary
            suspenseFallback={
              <SelectSkeleton className='w-[230px] mobile:w-[95px] h-[42px]' />
            }
          >
            <PMAuthSelector value={auth} setValue={setAuth} />
          </FieldQueryBoundary>
        </div>
      </td>
      <td className='max-w-[30%] relative whitespace-nowrap py-5 pl-3 pr-4 tablet:text-right text-sm font-medium sm:pr-0'>
        <div className='w-[100px] mobile:w-[80px]'>
          <Button theme='primary' onClick={handleClickSaveButton}>
            저장
            <span className='sr-only'>, 이름</span>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default PMAuthEditor;
