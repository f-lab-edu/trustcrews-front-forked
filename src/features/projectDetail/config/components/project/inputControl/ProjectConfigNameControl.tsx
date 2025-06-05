import Input from '@/shared/ui/Input';
import { useRecoilState } from 'recoil';
import Row from '@/shared/ui/Row';
import { projectConfigFormFieldSelector } from '@/store/projectDetail/config/project/ProjectConfigFormStateStore';

const ProjectConfigNameControl = () => {
  const [projectName, setProjectName] = useRecoilState(
    projectConfigFormFieldSelector('projectName'),
  );

  return (
    <Row>
      <Input
        id='projectName'
        label='프로젝트 이름'
        placeholder='이름을 입력해주세요.'
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
    </Row>
  );
};

export default ProjectConfigNameControl;
