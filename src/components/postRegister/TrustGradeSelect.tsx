'use client';

import Select from "@/components/ui/selector/Select"
import {SelectItem} from "@/utils/type";
import {TrustGradeNameType as Name, TrustGradeValueType as Value} from "@/app/project/@setting/_utils/type";
import React from "react";
import useGradeListByUser from "@/hooks/user/useGradeListByUser";
import SelectSkeleton from "@/components/ui/skeleton/SelectSkeleton";

type TrustGradeSelectProps = {
    trustGradeId: Value;
    setTrustGrade: (item: SelectItem<Name, Value>) => void;
}

const TrustGradeSelect = ({trustGradeId, setTrustGrade}: TrustGradeSelectProps) => {
    const {gradeList, isFetching} = useGradeListByUser();

    if (isFetching) return <SelectSkeleton label='프로젝트 신뢰등급' placeholder='신뢰등급 선택'/>

    const selectItems: SelectItem<Name, Value>[] = gradeList.map(
        ({trustGradeId, trustGradeName}) =>
            ({name: trustGradeName, value: trustGradeId})
    ) || [];

    selectItems.unshift({name: '신뢰등급 선택', value: null});

    const selected = selectItems.find(({value}) => value === trustGradeId)!;

    return <Select value={selected} setValue={setTrustGrade} items={selectItems}
                   label="프로젝트 신뢰등급" placeholder="등급을 선택해주세요."/>
}

export default TrustGradeSelect;