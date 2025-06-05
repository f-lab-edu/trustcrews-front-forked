import DateRangePicker from '@/shared/ui/DateRangePicker';
import { useRecoilState } from 'recoil';
import { milestoneModFormFieldSelector } from '@/store/projectDetail/job/milestone/MilestoneModalStateStore';

const START_DATE_INPUT_ID = 'milestoneModStartDate';
const END_DATE_INPUT_ID = 'milestoneModEndDate';

const MilestoneModDateControl = () => {
  const [startDate, setStartDate] = useRecoilState(
    milestoneModFormFieldSelector('startDate'),
  );
  const [endDate, setEndDate] = useRecoilState(
    milestoneModFormFieldSelector('endDate'),
  );

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

export default MilestoneModDateControl;
