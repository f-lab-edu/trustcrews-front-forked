import TextArea from '@/shared/ui/TextArea';
import { userInfoFormFieldSelector } from '@/store/useProfileEditor/UserInfoFormStateStore';
import { useRecoilState } from 'recoil';
import { ChangeEvent } from 'react';

const UpdateIntroductionControl = () => {
  const [introduction, setIntroduction] = useRecoilState(
    userInfoFormFieldSelector('intro'),
  );

  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduction(e.target.value);
  };

  return (
    <TextArea
      id='information'
      label='자기소개'
      placeholder='텍스트를 입력해주세요.'
      rows={3}
      cols={25}
      value={introduction || ''}
      onChange={handleChangeTextArea}
    />
  );
};

export default UpdateIntroductionControl;
