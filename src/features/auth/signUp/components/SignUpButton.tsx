import FormButton from '@/shared/ui/FormButton';
import { numStrToBigInt } from '@/shared/utils/stringUtils';
import {
  signUpInputScheme,
  useSignUp,
} from '@/features/auth/signUp/api/signUp';
import { ZodError } from 'zod';
import { useRouter } from 'next/navigation';
import useSnackbar from '@/shared/hooks/useSnackbar';
import { signUpFormStateStore } from '@/store/signup/SignUpFormStateStore';
import { useRecoilValue } from 'recoil';

const SignUpButton = () => {
  const router = useRouter();
  const { setSuccessSnackbar, setErrorSnackbar } = useSnackbar();
  const formData = useRecoilValue(signUpFormStateStore);

  const { mutate: signup } = useSignUp({
    onSuccess: ({ message }) => {
      setSuccessSnackbar(message);
      router.push('/');
    },
    onError: (error) => {
      setErrorSnackbar(error.message);
    },
  });

  const handleClickSignUpButton = () => {
    const data = {
      ...formData,
      positionId: numStrToBigInt(formData.positionId),
      techStackIds: formData.techStackIds.map((item) => numStrToBigInt(item)),
    };

    try {
      signUpInputScheme.parse(data);
    } catch (e: unknown) {
      setErrorSnackbar((e as ZodError).errors[0].message);
      return;
    }

    signup(data);
  };
  return <FormButton onClick={handleClickSignUpButton}>가입</FormButton>;
};

export default SignUpButton;
