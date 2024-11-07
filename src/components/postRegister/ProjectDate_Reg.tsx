import React from 'react';
import CalendarInput from "@/components/ui/form/CalendarInput";
import {useRecoilState} from "recoil";
import {projectFieldSelector} from "@/store/register/RegisterPostStateStore";
import FormRow from "@/components/ui/form/FormRow";

function ProjectDate_Reg() {
    const [{startDate}, setStartDate] = useRecoilState(projectFieldSelector('startDate'));
    const [{endDate}, setEndDate] = useRecoilState(projectFieldSelector('endDate'));

    return (
        <FormRow className="pc:place-self-center row-span-2 ">
            <div className='space-y-10'>
                <CalendarInput
                    id="startDate"
                    label="시작 날짜"
                    date={startDate}
                    setDate={(value) => setStartDate({startDate: value})}
                />
                <CalendarInput
                    id="endDate"
                    label="종료 날짜"
                    date={endDate}
                    setDate={(value) => setEndDate({endDate: value})}
                />
            </div>
        </FormRow>
    );
}

export default ProjectDate_Reg;