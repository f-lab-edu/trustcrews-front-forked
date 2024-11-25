import React from 'react';
import {ProjectAuthMap} from "@/utils/type";
import useCrewOptionList from "@/hooks/project/setting/useCrewOptionList";
import SelectSkeleton from "@/components/ui/skeleton/SelectSkeleton";
import Select from "@/components/ui/selector/Select";

type CrewAuthSelectItem = { name: ProjectAuthMap['name']; value: ProjectAuthMap['code'] };
function CrewAuthSelector({
                              value,
                              setValue
                          }: {
                              value: CrewAuthSelectItem,
                              setValue: (value: CrewAuthSelectItem) => void
                          }
) {
    const {crewOptions, isFetching} = useCrewOptionList();

    if(isFetching) return <SelectSkeleton label='' className='w-[230px] mobile:w-[95px] h-[42px]'/>

    const crewOptionSelectItems = crewOptions.map((crew) => ({name: crew.name, value: crew.code}));

    return (
        <div className='w-[230px] mobile:w-[95px]'>
            <Select
                items={crewOptionSelectItems}
                setValue={setValue}
                value={value}
            />
        </div>
    );
}

export default CrewAuthSelector;