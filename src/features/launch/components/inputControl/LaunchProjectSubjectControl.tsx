import Input from '@/shared/ui/Input';
import { useRecoilState } from 'recoil';
import Row from '@/shared/ui/Row';
import { projectFormFieldSelector } from '@/store/launch/ProjectFormStateStore';
import { ChangeEvent } from 'react';

const LaunchProjectSubjectControl = () => {
  const [subject, setSubject] = useRecoilState(
    projectFormFieldSelector('subject'),
  );

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  return (
    <Row className='pc:place-self-center'>
      <Input
        id='projectSubject'
        label='프로젝트 주제'
        value={subject}
        onChange={handleChangeInput}
      />
    </Row>
  );
};

export default LaunchProjectSubjectControl;
