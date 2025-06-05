import PositionSelect from '@/features/position/components/PositionSelect';
import { useRecoilState } from 'recoil';
import { signUpFormFieldSelector } from '@/store/signup/SignUpFormStateStore';

const SignUpPositionControl = () => {
  const [positionId, setPositionId] = useRecoilState(
    signUpFormFieldSelector('positionId'),
  );

  return (
    <PositionSelect
      positionId={positionId}
      onChange={(item) => setPositionId(item)}
      required
    />
  );
};

export default SignUpPositionControl;
