import FormButton from '@/shared/ui/FormButton';
import useSnackbar from '@/shared/hooks/useSnackbar';
import {
  userInfoInputSchema,
  userProfileImgInputSchema,
  useUpdateUserDetail,
} from '@/features/userProfileEditor/api/updateUserDetail';
import { ZodError } from 'zod';
import { useRecoilValue } from 'recoil';
import { userInfoFormStateStore } from '@/store/useProfileEditor/UserInfoFormStateStore';
import { userImageFormStateStore } from '@/store/useProfileEditor/UserImageFormStateStore';
import { numStrToBigInt } from '@/shared/utils/stringUtils';

const SaveUserProfileButton = () => {
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const { data: infoForm } = useRecoilValue(userInfoFormStateStore);
  const { image, hasUpdate: hasProfileImgUpdate } = useRecoilValue(
    userImageFormStateStore,
  );

  const { mutate: updateUser } = useUpdateUserDetail({
    onSuccess: (res) => setSuccessSnackbar(res.message),
    onError: (error) => setErrorSnackbar(error.message),
  });

  const handleClickSaveProfileButton = () => {
    const info = {
      ...infoForm,
      positionId: numStrToBigInt(infoForm.positionId),
      techStackIds: infoForm.techStackIds.map((item) => numStrToBigInt(item)),
    };

    try {
      userInfoInputSchema.parse(info);
    } catch (e: unknown) {
      setErrorSnackbar((e as ZodError).errors[0].message);
      return;
    }

    if (hasProfileImgUpdate) {
      try {
        userProfileImgInputSchema.parse(image);
      } catch (e: unknown) {
        if (e instanceof ZodError) setErrorSnackbar(e.errors[0].message);
        return;
      }
    }

    updateUser(hasProfileImgUpdate ? { info, image } : { info });
  };

  return <FormButton onClick={handleClickSaveProfileButton}>저장</FormButton>;
};

export default SaveUserProfileButton;
