'use client';

import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import useCreatePost from "@/hooks/useCreatePost";
import {useRecoilValue, useResetRecoilState} from "recoil";
import {
    createPostStateStore,
    createProjectStateStore,
    registerPostFormState
} from "@/store/register/RegisterPostStateStore";
import PostTitle from "@/components/postRegister/PostTitle";
import ProjectName_Reg from "@/components/postRegister/ProjectName_Reg";
import ProjectSubject_Reg from "@/components/postRegister/ProjectSubject_Reg";
import ProjectRecruitPosition from "@/components/postRegister/ProjectRecruitPosition";
import ProjectDate_Reg from "@/components/postRegister/ProjectDate_Reg";
import ProjectTech from "@/components/postRegister/ProjectTech";
import ProjectOwnerContact from "@/components/postRegister/ProjectOwnerContact";
import ProjectIntro from "@/components/postRegister/ProjectIntro";
import Button from "@/components/ui/Button";
import FormRowWide from "@/components/ui/form/FormRowWide";

function RegisterPage() {
    const router = useRouter();
    const {createPost, isCreating} = useCreatePost();
    const resetPostFormState = useResetRecoilState(createPostStateStore);
    const resetProjectFormState = useResetRecoilState(createProjectStateStore);
    const registerForm = useRecoilValue(registerPostFormState);

    useEffect(() => {
        return () => {
            resetPostFormState();
            resetProjectFormState();
        }
    }, [resetPostFormState, resetProjectFormState]);

    return (
        <div
            role='form'
            aria-label='게시글 및 프로젝트 생성'
            className="p-5 mobile:p-1 mb-8">
            <PostTitle/>
            <div
                className="grid pc:grid-cols-2 tablet:grid-cols-1 gap-y-10 place-content-between mobile:place-content-center">
                <ProjectName_Reg/>
                <ProjectSubject_Reg/>
                <ProjectRecruitPosition/>
                <ProjectDate_Reg/>
                <ProjectTech/>
                <ProjectOwnerContact/>
            </div>
            <ProjectIntro/>
            <FormRowWide className="space-x-2 text-center mt-10">
                <Button
                    theme="primary-hollow"
                    onClickHandler={() => router.push("/")}
                >
                    취소
                </Button>
                <Button
                    disabled={isCreating}
                    onClickHandler={() => createPost(registerForm)}
                >
                    등록
                </Button>
            </FormRowWide>
        </div>
    )
}

export default RegisterPage;