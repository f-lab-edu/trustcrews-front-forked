import { useEffect } from 'react';
import DateRangePicker from '@/shared/ui/DateRangePicker';
import { useRecoilState } from 'recoil';
import { addDays, format } from 'date-fns';
import { milestoneAddFormFieldSelector } from '@/store/projectDetail/job/milestone/MilestoneModalStateStore';

const START_DATE_INPUT_ID = 'milestoneAddStartDate';
const END_DATE_INPUT_ID = 'milestoneAddEndDate';

const MilestoneDateControl = () => {
  const [startDate, setStartDate] = useRecoilState(
    milestoneAddFormFieldSelector('startDate'),
  );
  const [endDate, setEndDate] = useRecoilState(
    milestoneAddFormFieldSelector('endDate'),
  );

  useEffect(() => {
    if (!startDate) {
      setStartDate(format(new Date(), 'yyyy-MM-dd'));
    }

    if (!endDate) {
      setEndDate(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
    }
  }, [startDate, endDate, setStartDate, setEndDate]);

  return (
    <div className='flex'>
      <label
        htmlFor={START_DATE_INPUT_ID}
        className='text-gray-700 font-semibold self-center'
      >
        기간
      </label>
      <DateRangePicker
        startDateId={START_DATE_INPUT_ID}
        endDateId={END_DATE_INPUT_ID}
        startDate={startDate}
        endDate={endDate}
        setStartDate={(date) => setStartDate(date)}
        setEndDate={(date) => setEndDate(date)}
      />
    </div>
  );
};

export default MilestoneDateControl;
