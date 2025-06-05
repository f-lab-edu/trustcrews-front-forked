import PositionSelect from '@/features/position/components/PositionSelect';
import { userInfoFormFieldSelector } from '@/store/useProfileEditor/UserInfoFormStateStore';
import { useRecoilState } from 'recoil';
import { Field, Label } from '@headlessui/react';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';
import SelectSkeleton from '@/shared/ui/skeleton/SelectSkeleton';

const UpdatePositionControl = () => {
  const [positionId, setPositionId] = useRecoilState(
    userInfoFormFieldSelector('positionId'),
  );

  const handleChangeSelect = (item: string) => {
    setPositionId(item);
  };

  return (
    <Field>
      <Label className='block text-gray-700 mobile:text-sm'>직무</Label>
      <FieldQueryBoundary
        suspenseFallback={
          <SelectSkeleton placeholder='직무를 선택해 주세요.' />
        }
      >
        <PositionSelect positionId={positionId} onChange={handleChangeSelect} />
      </FieldQueryBoundary>
    </Field>
  );
};

export default UpdatePositionControl;
