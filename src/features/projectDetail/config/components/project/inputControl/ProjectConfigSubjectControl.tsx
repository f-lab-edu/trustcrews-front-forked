import Input from '@/shared/ui/Input';
import { useRecoilState } from 'recoil';
import Row from '@/shared/ui/Row';
import { projectConfigFormFieldSelector } from '@/store/projectDetail/config/project/ProjectConfigFormStateStore';

const ProjectConfigSubjectControl = () => {
  const [projectSubject, setProjectSubject] = useRecoilState(
    projectConfigFormFieldSelector('projectSubject'),
  );

  return (
    <Row>
      <Input
        id='projectSubject'
        label='프로젝트 주제'
        placeholder='주제를 입력해주세요.'
        value={projectSubject}
        onChange={(e) => setProjectSubject(e.target.value)}
      />
    </Row>
  );
};

export default ProjectConfigSubjectControl;
