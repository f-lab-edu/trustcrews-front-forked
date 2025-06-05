import Input from '@/shared/ui/Input';
import { signUpFormFieldSelector } from '@/store/signup/SignUpFormStateStore';
import { useRecoilState } from 'recoil';

const SignUpPasswordControl = () => {
  const [{ init, confirm }, setPassword] = useRecoilState(
    signUpFormFieldSelector('password'),
  );

  return (
    <>
      <Input
        type='password'
        id='password'
        label='비밀번호'
        title='영문, 특수문자 포함 6~12자'
        required
        value={init}
        onChange={(e) =>
          setPassword((prev) => ({ ...prev, init: e.target.value }))
        }
      />
      <Input
        type='password'
        id='passwordConfirmation'
        label='비밀번호 확인'
        title='영문, 특수문자 포함 6~12자'
        required
        value={confirm}
        onChange={(e) =>
          setPassword((prev) => ({ ...prev, confirm: e.target.value }))
        }
      />
    </>
  );
};

export default SignUpPasswordControl;
