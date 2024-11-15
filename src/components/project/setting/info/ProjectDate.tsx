import React, {useEffect, useState} from 'react';
import CalendarInput from "@/components/ui/form/CalendarInput";
import {useRecoilState} from "recoil";
import {
    projectSettingInfoSelector,
    ProjectSettingInfoUpdField
} from "@/store/project/setting/ProjectSettingFormStateStore";
import {ProjectSettingInfoData} from "@/service/project/setting/info";
import {addDays, format} from "date-fns";
import FormRow from "@/components/ui/form/FormRow";

type ProjectSettingInfoStartDate = ProjectSettingInfoUpdField<'startDate'>;
type ProjectSettingInfoEndDate = ProjectSettingInfoUpdField<'endDate'>;

function ProjectDate({
                         initStartDate,
                         initEndDate
                     }: {
    initStartDate: ProjectSettingInfoData['startDate'],
    initEndDate: ProjectSettingInfoData['endDate']
}) {
    const [startDate, setStartDate] = useRecoilState(projectSettingInfoSelector('startDate'));
    const [endDate, setEndDate] = useRecoilState(projectSettingInfoSelector('endDate'));

    const startDateValue = startDate ? startDate as ProjectSettingInfoStartDate : initStartDate;
    const endDateValue = endDate ? endDate as ProjectSettingInfoEndDate : initEndDate;

    const [endMinDate, setEndMinDate] = useState<Date | null>(() => addDays(new Date(startDateValue), 1));

    // 시작날짜보다 종료날짜 앞서지 못하도록
    useEffect(() => {
        const endDateValueNum = parseInt(endDateValue.replaceAll("-", ""));
        const startDateValueNum = parseInt(startDateValue.replaceAll('-', ""));
        const initEndMinDate = addDays(new Date(startDateValue), 1);
        if (endDateValueNum <= startDateValueNum) {
            setEndDate(format(initEndMinDate, 'yyyy-MM-dd'));
        }
        setEndMinDate(initEndMinDate);

    }, [startDateValue, endDateValue, setEndDate, setEndMinDate]);

    return (
        <FormRow className="row-span-2 ">
            <div className='space-y-10'>
                <CalendarInput
                    id="startDate"
                    label="시작 날짜"
                    placeholder="날짜를 선택해주세요."
                    date={startDateValue}
                    setDate={(startDate) => setStartDate(startDate)}
                />
                <CalendarInput
                    id="endDate"
                    label="종료 날짜"
                    placeholder="날짜를 선택해주세요."
                    date={endDateValue}
                    setDate={(endDate) => setEndDate(endDate)}
                    minDate={endMinDate}
                />
            </div>
        </FormRow>
    );
}

export default ProjectDate;