import TechStackSelect from '@/features/techStack/components/TechStackSelect';
import { useRecoilState } from 'recoil';
import { userInfoFormFieldSelector } from '@/store/useProfileEditor/UserInfoFormStateStore';
import { Field, Label } from '@headlessui/react';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';
import SelectSkeleton from '@/shared/ui/skeleton/SelectSkeleton';

const UpdateTechStackControl = () => {
  const [techStackIds, setTechStackIds] = useRecoilState(
    userInfoFormFieldSelector('techStackIds'),
  );

  const handleChangeSelect = (item: string[]) => {
    setTechStackIds(item);
  };

  return (
    <Field>
      <Label className='block text-gray-700 mobile:text-sm'>관심 스택</Label>
      <FieldQueryBoundary
        suspenseFallback={
          <SelectSkeleton placeholder='관심 스택을 선택해 주세요' />
        }
      >
        <TechStackSelect
          selectedTechStackIds={techStackIds}
          onChange={handleChangeSelect}
        />
      </FieldQueryBoundary>
    </Field>
  );
};

export default UpdateTechStackControl;
