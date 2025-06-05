import Input from '@/shared/ui/Input';
import CheckNicknameButton from '@/features/checkNickname/components/CheckNicknameButton';
import { useRecoilState } from 'recoil';
import { ChangeEvent, useEffect, useRef } from 'react';
import { signUpFormFieldSelector } from '@/store/signup/SignUpFormStateStore';

const SignUpNicknameControl = () => {
  const [isCheckedNickname, setIsCheckedNickname] = useRecoilState(
    signUpFormFieldSelector('isCheckedNickname'),
  );
  const [nickname, setNickname] = useRecoilState(
    signUpFormFieldSelector('nickname'),
  );

  const initSignUpNicknameRef = useRef<string | null>(null);

  useEffect(() => {
    if (!initSignUpNicknameRef.current)
      initSignUpNicknameRef.current = nickname;
  }, [initSignUpNicknameRef, nickname]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsCheckedNickname(initSignUpNicknameRef.current === e.target.value);
  };

  const handleSuccess = () => {
    setIsCheckedNickname(true);
  };

  const handleError = () => {
    setIsCheckedNickname(false);
  };

  return (
    <div className='flex items-center justify-start space-x-1.5'>
      <Input
        id='nickname'
        title='영문, 숫자 포함 6자 이상'
        label='닉네임'
        required
        value={nickname}
        onChange={handleChangeInput}
      />
      <CheckNicknameButton
        nickname={nickname}
        isChecked={isCheckedNickname}
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
};

export default SignUpNicknameControl;
