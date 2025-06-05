import { useRecoilValue, useSetRecoilState } from 'recoil';
import { projectIdState } from '@/store/projectDetail/ProjectIdStateStore';
import { bigIntToString, numStrToBigInt } from '@/shared/utils/stringUtils';
import ResetProjectConfigButton from '@/features/projectDetail/config/components/project/ResetProjectConfigButton';
import ProjectConfigTechStackControl from '@/features/projectDetail/config/components/project/inputControl/ProjectConfigTechStackControl';
import SaveProjectConfigButton from '@/features/projectDetail/config/components/project/SaveProjectConfigButton';
import ConfigContainer from '@/features/projectDetail/config/layouts/ConfigContainer';
import ConfigSummary from '@/features/projectDetail/config/layouts/ConfigSummary';
import ConfigContents from '@/features/projectDetail/config/layouts/ConfigContents';
import ProjectConfigNameControl from '@/features/projectDetail/config/components/project/inputControl/ProjectConfigNameControl';
import ProjectConfigSubjectControl from '@/features/projectDetail/config/components/project/inputControl/ProjectConfigSubjectControl';
import ProjectConfigDateControl from '@/features/projectDetail/config/components/project/inputControl/ProjectConfigDateControl';
import { useProjectConfig } from '@/features/projectDetail/config/api/project/getProjectConfig';
import { useEffect } from 'react';
import {
  projectConfigFormLoadingSelector,
  projectConfigFormStateStore,
} from '@/store/projectDetail/config/project/ProjectConfigFormStateStore';
import ProjectConfigFormSkeleton from '@/features/projectDetail/config/components/project/ProjectConfigFormSkeleton';

const ProjectConfigForm = () => {
  const isFormLoading = useRecoilValue(projectConfigFormLoadingSelector);
  const setProjectConfigForm = useSetRecoilState(projectConfigFormStateStore);
  const projectId = useRecoilValue(projectIdState);

  const {
    data: { data: projectInfo },
  } = useProjectConfig(numStrToBigInt(projectId));

  const { projectName, projectSubject, startDate, endDate, technologyStacks } =
    projectInfo;

  const technologyIds = technologyStacks.map((v) =>
    bigIntToString(v.techStackId),
  );

  useEffect(() => {
    if (isFormLoading) {
      setProjectConfigForm({
        isFormLoading: false,
        data: {
          projectName,
          projectSubject,
          startDate,
          endDate,
          technologyIds,
        },
      });
    }
  }, [
    isFormLoading,
    projectName,
    projectSubject,
    startDate,
    endDate,
    technologyIds,
    setProjectConfigForm,
  ]);

  if (isFormLoading) return <ProjectConfigFormSkeleton />;

  return (
    <ConfigContainer>
      <ConfigSummary>프로젝트 정보</ConfigSummary>
      <ConfigContents>
        <ProjectConfigNameControl />
        <ProjectConfigSubjectControl />
        <ProjectConfigDateControl />
        <ProjectConfigTechStackControl />
      </ConfigContents>
      <div className='w-full my-4 flex items-center justify-center space-x-2'>
        <ResetProjectConfigButton />
        <SaveProjectConfigButton />
      </div>
    </ConfigContainer>
  );
};

export default ProjectConfigForm;
