'use client';

import Button from '@/shared/ui/Button';
import { useRecoilValue } from 'recoil';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { projectIdState } from '@/store/projectDetail/ProjectIdStateStore';
import { projectConfigFormStateStore } from '@/store/projectDetail/config/project/ProjectConfigFormStateStore';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import {
  UpdateProjectConfigInput,
  updateProjectConfigInputSchema,
  useUpdateProjectConfig,
} from '@/features/projectDetail/config/api/project/updateProjectConfig';
import { projectManageAuthStateStore } from '@/store/projectDetail/config/pmAuth/ProjectManageAuthStateStore';
import { ZodError } from 'zod';

const SaveProjectConfigButton = () => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const { code: userPMAuth } = useRecoilValue(projectManageAuthStateStore);
  const projectId = useRecoilValue(projectIdState);

  const {
    data: { projectName, projectSubject, startDate, endDate, technologyIds },
  } = useRecoilValue(projectConfigFormStateStore);

  const { mutate: updatePost, isPending: isUpdating } = useUpdateProjectConfig(
    numStrToBigInt(projectId),
    userPMAuth,
    {
      onSuccess: (res) => setSuccessSnackbar(res.message),
      onError: (error) => setErrorSnackbar(error.message),
    },
  );

  const handleClickUpdateButton = () => {
    const data: UpdateProjectConfigInput = {
      projectName,
      projectSubject,
      startDate,
      endDate,
      technologyIds: technologyIds.map((v) => numStrToBigInt(v)),
    };

    try {
      updateProjectConfigInputSchema.parse(data);
    } catch (e: unknown) {
      if (e instanceof ZodError) setErrorSnackbar(e.errors[0].message);
      return;
    }

    updatePost(data);
  };

  return (
    <Button
      size='md'
      onClick={handleClickUpdateButton}
      disabled={isUpdating}
      className='disabled:!bg-gray-400 disabled:!text-white'
    >
      저장
    </Button>
  );
};

export default SaveProjectConfigButton;
