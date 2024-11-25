import {isValidEmail, isValidNickname, isValidPassword, throwErrorIfInvalid} from "@/utils/common";
import {PositionId, TechStackValueType} from "@/utils/type";
import _ from "lodash";
import {request} from "@/service/request";

const publicURL = process.env.NEXT_PUBLIC_URL;

export type SignUpRequest = {
    email: string;
    password: string;
    passwordConfirmation: string;
    isCheckedNickname: boolean;
    nickname: string;
    positionId: PositionId | null;
    techStackIds: TechStackValueType[];
    intro: string;
}

export const signUp = async (signUpRequest: SignUpRequest) => {

    const {
        email,
        password,
        passwordConfirmation,
        nickname,
        isCheckedNickname,
        positionId,
        techStackIds,
        intro
    } = signUpRequest;

    throwErrorIfInvalid(_.isEqual("", email), "이메일을 입력해주세요.");
    throwErrorIfInvalid(!isValidEmail(email), "올바른 형식의 이메일을 입력해주세요.");
    throwErrorIfInvalid(_.isEqual("", password), "비밀번호를 입력해주세요.");
    throwErrorIfInvalid(!isValidPassword(password), "비밀번호는 영어와 특수문자를 포함하고, 6~12 자리만 가능합니다.");
    throwErrorIfInvalid(_.isEqual("", passwordConfirmation), "비밀번호 확인을 입력해주세요.");
    throwErrorIfInvalid(!_.isEqual(password, passwordConfirmation), "비밀번호와 비밀번호 확인이 일치하지 않습니다");
    throwErrorIfInvalid(_.isEqual("", nickname), "닉네임을 입력해주세요.");
    throwErrorIfInvalid(!isValidNickname(nickname), "닉네임은 영어 숫자 포함 6~10 자리만 가능합니다.");
    throwErrorIfInvalid(!isCheckedNickname, "닉네임 중복확인을 해주세요.");
    throwErrorIfInvalid(_.isNull(positionId), "직무를 선택해주세요.");
    throwErrorIfInvalid(_.isEmpty(techStackIds), "관심 스택을 선택해주세요.");

    const reqData = {email, password, nickname, positionId, techStackIds, intro};

    return await request('POST','/api/user/signup', reqData)
};
