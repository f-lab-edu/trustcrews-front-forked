import TechStackSelect from '@/features/techStack/components/TechStackSelect';
import { useRecoilState } from 'recoil';
import Row from '@/shared/ui/Row';
import { projectFormFieldSelector } from '@/store/launch/ProjectFormStateStore';
import SelectSkeleton from '@/shared/ui/skeleton/SelectSkeleton';
import FieldQueryBoundary from '@/lib/error/FieldQueryBoundary';
import { Field, Label } from '@headlessui/react';

const LaunchTechStackControl = () => {
  const [technologyIds, setTechIds] = useRecoilState(
    projectFormFieldSelector('technologyIds'),
  );

  const handleChangeSelect = (item: string[]) => {
    setTechIds([...item]);
  };

  return (
    <Row>
      <Field>
        <Label className='block text-gray-700 mobile:text-sm'>기술 스택</Label>
        <FieldQueryBoundary
          suspenseFallback={
            <SelectSkeleton placeholder='기술 스택을 선택해주세요.' />
          }
        >
          <TechStackSelect
            selectedTechStackIds={technologyIds}
            onChange={handleChangeSelect}
          />
        </FieldQueryBoundary>
      </Field>
    </Row>
  );
};

export default LaunchTechStackControl;
