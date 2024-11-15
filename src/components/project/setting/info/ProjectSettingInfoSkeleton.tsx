import React from 'react';
import InputStyleSkeleton from "@/components/ui/skeleton/InputStyleSkeleton";
import ButtonStyleSkeleton from "@/components/ui/skeleton/ButtonStyleSkeleton";
import SettingContainer from "@/components/project/setting/SettingContainer";
import SettingTitle from "@/components/project/setting/SettingTitle";
import SettingBody from "@/components/project/setting/SettingBody";

function ProjectSettingInfoSkeleton() {
    return (
        <>
                <SettingBody>
                    <InputStyleSkeleton label='프로젝트 이름'/>
                    <InputStyleSkeleton label='프로젝트 주제'/>
                    <div className='row-span-2'>
                        <div className="w-[380px] tablet:w-full space-y-10 mobile:mx-auto">
                            <InputStyleSkeleton label='시작 날짜'/>
                            <InputStyleSkeleton label='종료 날짜'/>
                        </div>
                    </div>
                    <InputStyleSkeleton label='기술 스택'/>
                </SettingBody>
                {/*<div className="w-full my-4 flex items-center justify-center space-x-2">*/}
                {/*    <ButtonStyleSkeleton>초기화</ButtonStyleSkeleton>*/}
                {/*    <ButtonStyleSkeleton>저장</ButtonStyleSkeleton>*/}
                {/*</div>*/}
        </>
    );
}

export default ProjectSettingInfoSkeleton;