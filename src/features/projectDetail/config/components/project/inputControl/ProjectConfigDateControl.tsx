import DateInput from '@/shared/ui/DateInput';
import { useRecoilState } from 'recoil';
import { addDays, format } from 'date-fns';
import Row from '@/shared/ui/Row';
import { projectConfigFormFieldSelector } from '@/store/projectDetail/config/project/ProjectConfigFormStateStore';
import { useEffect } from 'react';

const ProjectConfigDateControl = () => {
  const [startDate, setStartDate] = useRecoilState(
    projectConfigFormFieldSelector('startDate'),
  );
  const [endDate, setEndDate] = useRecoilState(
    projectConfigFormFieldSelector('endDate'),
  );

  const endMinDate = addDays(new Date(startDate), 1);

  useEffect(() => {
    const _startDate = new Date(startDate);
    const _endDate = new Date(endDate);

    if (_endDate <= _startDate) setEndDate(format(endMinDate, 'yyyy-MM-dd'));
  }, [startDate, endDate, setEndDate, endMinDate]);

  return (
    <Row className='row-span-2 '>
      <div className='space-y-10'>
        <DateInput
          id='startDate'
          label='시작 날짜'
          placeholder='날짜를 선택해주세요.'
          date={startDate}
          setDate={(startDate) => setStartDate(startDate)}
        />
        <DateInput
          id='endDate'
          label='종료 날짜'
          placeholder='날짜를 선택해주세요.'
          date={endDate}
          setDate={(endDate) => setEndDate(endDate)}
          minDate={endMinDate}
        />
      </div>
    </Row>
  );
};

export default ProjectConfigDateControl;
