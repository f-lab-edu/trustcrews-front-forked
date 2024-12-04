'use client';
import React, {useState} from "react";
import {useRouter} from 'next/navigation';
import Input from "@/components/ui/form/Input";
import TextArea from "@/components/ui/form/TextArea";
import FormButton from "@/components/ui/form/FormButton";
import NicknameField from "@/components/ui/form/NickNameField";
import {PositionId, TechStackValueType} from "@/utils/type";
import {signUp, SignUpRequest} from "@/service/user/signup";
import {useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";
import TechStackSelect from "@/components/ui/form/TechStackSelect";
import PositionSelect from "@/components/user/signup/PositionSelect";

function SignUpForm() {
    const router = useRouter();
    const setSnackbar = useSetRecoilState(snackbarState);

    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [positionId, setPositionId] = useState<PositionId | null>(null);
    const [techStackIds, setTechStackIds] = useState<TechStackValueType[]>([]);
    const [intro, setIntro] = useState("");
    const [isCheckedNickname, setIsCheckedNickname] = useState(false);

    const userSignUp = async () => {
        const signUpRequest: SignUpRequest =
            {
                email,
                password,
                passwordConfirmation,
                nickname,
                positionId,
                techStackIds,
                isCheckedNickname,
                intro
            };

        try {
            const res = await signUp(signUpRequest);
            const {result, message} = res;
            if (result === "success") {
                setSnackbar({show: true, type: "INFO", content: message});
                router.push("/");
            } else {
                setSnackbar({show: true, type: 'ERROR', content: '프로세스 수행중 오류가 발생했습니다'});
            }
        } catch (e: unknown) {
            setSnackbar({show: true, type: "ERROR", content: (e as Error).message});
        }
    }

    const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
        setIsCheckedNickname(false);
    }


    return (
        <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-3">
            <Input id="email" label="이메일" placeholder="example@trustcrews.com" required
                   value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input id="password" label="비밀번호" placeholder="영문, 특수문자 포함 6~12자" required
                   value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Input id="passwordConfirmation" label="비밀번호 확인" placeholder="영문, 특수문자 포함 6~12자" required
                   value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}/>
            <NicknameField placeholder="영문, 숫자 포함 6~10자" setCheck={setIsCheckedNickname} required
                           value={nickname} onChange={onChangeNickname}/>
            <PositionSelect positionId={positionId} setPosition={(item) => setPositionId(item)} required/>
            <TechStackSelect techStacks={techStackIds}
                             setTechStacks={(item: readonly TechStackValueType[]) => setTechStackIds([...item])}
                             label="관심 스택" placeholder="관심 스택을 선택해주세요." required
            />
            <TextArea id="information" label="자기소개" placeholder="텍스트를 입력해주세요." rows={3} cols={25} value={intro}
                      onChange={(e) => setIntro(e.target.value)}
            />
            <FormButton onClick={() => userSignUp()}>가입</FormButton>
        </div>
    )
}

export default SignUpForm;