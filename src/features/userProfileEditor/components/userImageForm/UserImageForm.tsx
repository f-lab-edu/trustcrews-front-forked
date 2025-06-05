import { ChangeEvent, useRef } from 'react';
import { useRecoilState } from 'recoil';
import Avatar from '@/shared/ui/Avatar';
import Button from '@/shared/ui/Button';
import { userImageFormStateStore } from '@/store/useProfileEditor/UserImageFormStateStore';
import { useUserDetailInfo } from '@/features/userProfile/api/getUserDetailInfo';

const UserImageForm = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [{ image, hasUpdate }, setUserImageState] = useRecoilState(
    userImageFormStateStore,
  );

  const {
    data: {
      data: { profileImgSrc },
    },
  } = useUserDetailInfo();

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0)
      setUserImageState({ hasUpdate: true, image: files[0] });
  };

  const handleClickUploadFileButton = () => {
    if (fileRef.current) fileRef.current.click();
  };

  const handleClickUnloadFileButton = () => {
    setUserImageState({ hasUpdate: true, image: null });
    if (fileRef.current) fileRef.current.value = '';
  };

  let imageSrc = profileImgSrc;
  if (hasUpdate) imageSrc = image ? URL.createObjectURL(image) : null;

  return (
    <>
      <div className='w-full h-fit text-center'>
        <Avatar size='lg' src={imageSrc || ''} alt='사용자 아바타 이미지' />
      </div>
      <div className='text-center space-x-2'>
        <input
          ref={fileRef}
          type='file'
          accept='.png, .jpg, .jpeg, .gif'
          hidden
          onChange={handleChangeImage}
        />
        <Button
          size='md'
          theme='primaryHollow'
          onClick={handleClickUploadFileButton}
        >
          변경
        </Button>
        <Button
          size='md'
          theme='primary'
          onClick={handleClickUnloadFileButton}
          hidden={!image}
        >
          제거
        </Button>
      </div>
    </>
  );
};

export default UserImageForm;
