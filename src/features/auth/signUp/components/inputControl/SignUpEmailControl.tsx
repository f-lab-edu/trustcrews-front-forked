import Input from '@/shared/ui/Input';
import { useRecoilState } from 'recoil';
import { signUpFormFieldSelector } from '@/store/signup/SignUpFormStateStore';

const SignUpEmailControl = () => {
  const [email, setEmail] = useRecoilState(signUpFormFieldSelector('email'));

  return (
    <Input
      id='email'
      label='이메일'
      placeholder='example@trustcrews.com'
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  );
};

export default SignUpEmailControl;
