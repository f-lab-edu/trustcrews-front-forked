import { useRecoilState } from 'recoil';
import { userInfoFormFieldSelector } from '@/store/useProfileEditor/UserInfoFormStateStore';
import Input from '@/shared/ui/Input';
import { ChangeEvent, useEffect, useRef } from 'react';
import CheckNicknameButton from '@/features/checkNickname/components/CheckNicknameButton';

export const UpdateNicknameControl = () => {
  const [isCheckedNickname, setIsCheckedNickname] = useRecoilState(
    userInfoFormFieldSelector('isCheckedNickname'),
  );
  const [nickname, setNickname] = useRecoilState(
    userInfoFormFieldSelector('nickname'),
  );

  const initNicknameRef = useRef<string | null>(null);
  useEffect(() => {
    if (!initNicknameRef.current) initNicknameRef.current = nickname;
  }, [initNicknameRef, nickname]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsCheckedNickname(initNicknameRef.current === e.target.value);
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
