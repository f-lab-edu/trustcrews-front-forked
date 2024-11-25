import React from "react";
import MultiSelect from "@/components/ui/selector/MultiSelect";
import {useTechStackList} from "@/hooks/common/useTechStackList";
import {SelectItem, TechStackNameType as Name, TechStackValueType as Value} from "@/utils/type";
import SelectSkeleton from "@/components/ui/skeleton/SelectSkeleton";

interface TechStackSelectProps {
    techStacks: readonly Value[];
    setTechStacks: (item: readonly Value[]) => void;
    label?: string;
    placeholder?: string;
    required?: boolean;
}

const TechStackSelect = ({techStacks, setTechStacks, label, placeholder, required}: TechStackSelectProps) => {
    const {data, isFetching} = useTechStackList();

    if (isFetching) return <SelectSkeleton label="사용 스택" placeholder="사용 스택을 선택해주세요."/>;

    const techStackList: SelectItem<Name, Value>[] = data.map(
        ({techStackId, techStackName}) => ({name: techStackName, value: techStackId})
    );

    const selectedTechStacks: SelectItem<Name, Value>[] = techStackList.filter(
        ({value}) => techStacks.includes(value)
    );

    return (
        <MultiSelect
            values={selectedTechStacks}
            setValues={
                (item: readonly SelectItem<Name, Value>[]) =>
                    setTechStacks(item.map(({value}) => value))
            }
            items={techStackList}
            label={label}
            placeholder={placeholder}
            required={required}
        />
    )
}

export default TechStackSelect;