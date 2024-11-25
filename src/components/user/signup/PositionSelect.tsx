import Select from "@/components/ui/selector/Select";
import {usePositionList} from "@/hooks/common/usePositionList";
import {PositionId, SelectItem} from "@/utils/type";
import SelectSkeleton from "@/components/ui/skeleton/SelectSkeleton";

interface PositionSelectProps {
    positionId: PositionId | null;
    setPosition: (item: PositionId | null) => void;
    required?: boolean;
}

const PositionSelect = ({positionId, setPosition, required}: PositionSelectProps) => {
    const {data, isFetching} = usePositionList();

    if (isFetching) return <SelectSkeleton label='직무' placeholder='직무를 선택해주세요'/>;

    const positionList: SelectItem<string, PositionId | null>[] = data!.data!.map(
        ({positionId, positionName}) => ({name: positionName, value: positionId})
    );
    positionList.unshift({name: '직무', value: null})

    const selected: SelectItem<string, PositionId | null> = positionList.find(
            ({value}) => value === positionId
    )!;

    return (
        <Select
            value={selected}
            setValue={(item: SelectItem<string, PositionId | null>) => setPosition(item.value)}
            items={positionList}
            label="직무"
            placeholder="직무를 선택해주세요."
            required={required}
        />
    )
}

export default PositionSelect;