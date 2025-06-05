import TextArea from '@/shared/ui/TextArea';
import { useRecoilState } from 'recoil';
import { signUpFormFieldSelector } from '@/store/signup/SignUpFormStateStore';

const SignUpIntroControl = () => {
  const [intro, setIntro] = useRecoilState(signUpFormFieldSelector('intro'));

  return (
    <TextArea
      id='information'
      label='자기소개'
      placeholder='텍스트를 입력해주세요.'
      rows={3}
      cols={25}
      value={intro}
      onChange={(e) => setIntro(e.target.value)}
    />
  );
};

export default SignUpIntroControl;
