import {
    ButtonSize,
    ButtonTheme,
    MilestoneInfo,
    PositionItem,
    ProjectInfoSummary,
    SelectItem,
    StatusCode,
    TechStackItem
} from "./type";
import _, {camelCase} from "lodash";
import {ReactNode} from "react";
import {AlertMenuCode, AlertMenuName} from "@/service/project/alert/type";



export const BADGE_COLOR = {
    red: "bg-red-50 text-red-700 ring-red-600/10",
    yellow: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
    green: "bg-green-50 text-green-700 ring-green-600/20",
    blue: "bg-blue-50 text-blue-700 ring-blue-700/10",
    purple: "bg-purple-50 text-purple-700 ring-purple-700/10",
    slate: "bg-slate-50 text-slate-600 ring-slate-700/20",
    fullRed: "bg-[#FF513A] text-[#FFFFFF]",
    fullYellow: "text-[#FFFFFF] text[#7B5C03]"
} as const;

export type BadgeColor = keyof typeof BADGE_COLOR;
export type BadgeColorValue = typeof BADGE_COLOR[BadgeColor];

export const BADGE_SIZE = {
    xs: "text-[11px] mobile:text-[9px] px-2 mobile:px-1 py-0.5 mobile:py-0",
    sm: "tablet:text-sm mobile:text-xs px-2 py-1",
    md: "tablet:text-lg mobile:text-base tablet:px-8 mobile:px-4 tablet:py-4 mobile:py-2",
    lg: "text-lg px-8 py-4",
} as const;

export type BadgeSize = keyof typeof BADGE_SIZE;
export type BadgeSizeValue = typeof BADGE_SIZE[BadgeSize];

export interface BadgeInterface {
    color?(): BadgeColorValue;
    size(): BadgeSizeValue;
}

export class NoticeBadge implements BadgeInterface {
    private readonly _color: BadgeColor;
    private readonly _size: BadgeSize;
    private _text: string;

    constructor(color:BadgeColor, size:BadgeSize, text:string) {
        this._color = color;
        this._size = size;
        this._text = text;
    }

    color(): BadgeColorValue {
        return BADGE_COLOR[this._color];
    }

    size(): BadgeSizeValue {
        return BADGE_SIZE[this._size];
    }

    text(): string {
        return this._text;
    }
}

export class _NoticeBadge extends NoticeBadge {
    constructor(color: BadgeColor, text: AlertMenuName) {
        super(color, "sm", text);
    }
}

export const NOTICE_BADGE: Record<AlertMenuCode, _NoticeBadge> = {
    PRA2001: new _NoticeBadge("blue","크루"),
    PRA1002: new _NoticeBadge("yellow", "모집"),
    PRA1003: new _NoticeBadge("red", "강제탈퇴"),
} as const;


export function makeImageSize(size: string) {
    let imageSize;
    switch (size) {
        case "2xs":
            imageSize = "h-[24px] w-[24px]";
            break;
        case "xs":
            imageSize = "pc:h-[40px] pc:w-[40px] h-[32px] w-[32px]";
            break;
        case "sm":
            imageSize = "pc:h-[64px] pc:w-[64px] h-[40px] w-[40px]";
            break;
        case "md":
            imageSize = "pc:h-[96px] pc:w-[96px] h-[64px] w-[64px]";
            break;
        case "lg":
            imageSize = "pc:h-[160px] pc:w-[160px] h-[112px] w-[112px]";
            break;
        default:
            imageSize = size;
    }

    return imageSize;
}

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export function getSelectItemValue<T extends ReactNode, V extends ReactNode>(item: SelectItem<T, V>) {
    return item.value;
}

export function getPositionSelectItem(item: PositionItem | null) {
    if (item) {
        return {value: item.positionId, name: item.positionName};
    }

    return item;
}

export function getPositionSelectItems(items: PositionItem[]) {
    if (items.length > 0) {
        return items.map(
            ({positionId, positionName}) =>
                ({value: bigIntToString(positionId), name: positionName})
        );
    }

    return [];
}

export function getTechStackSelectItems(items: TechStackItem[]): SelectItem<string, string>[] {
    if (items.length > 0) {
        return items.map(
            ({techStackId, techStackName}) =>
                ({value: bigIntToString(techStackId), name: techStackName})
        );
    }

    return [];
}

export function JSONReplaceBigInt(data: Record<string, unknown>) {
    return JSON.stringify(data, (k, v) => (typeof v === 'bigint' ? Number(v) : v));
}

export const isValidEmail = (email: string) => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const isValidNickname = (nickname: string) => {
    const nicknameRegex: RegExp = /^[a-zA-Z0-9]{6,10}$/;
    return nicknameRegex.test(nickname);
}

export const isValidPassword = (password: string) => {
    const passwordRegex: RegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,12}$/;
    return passwordRegex.test(password);
}

export function getRandomBigInt() {
    // Calculate the range (inclusive)
    const range = BigInt(Number.MAX_SAFE_INTEGER * 2) - BigInt(Number.MAX_SAFE_INTEGER);

    // Calculate the number of bytes needed to represent the range
    const byteLength = Math.ceil(Math.log2(Number(range)) / 8);

    // Create a buffer to store random bytes
    const buffer = new Uint8Array(byteLength);

    // Generate random bytes
    crypto.getRandomValues(buffer);

    // Convert the buffer to a BigInt
    let randomBigInt = 0n;
    for (let i = 0; i < byteLength; i++) {
        randomBigInt <<= 8n;
        randomBigInt |= BigInt(buffer[i]);
    }

    // Adjust the value to fit within the specified range
    randomBigInt = randomBigInt % range + BigInt(1);

    return randomBigInt;
}


/**
 * startDate 기준 데이터 배열 정렬
 * @param dataList
 * @param sortBy desc : 내림차순(늦은날짜 -> 빠른날짜), asc : 오름차순(빠른날짜 -> 늦은날짜)
 */
export function sortByStartDate<T extends ProjectInfoSummary | MilestoneInfo>(dataList: T[], sortBy: 'asc' | 'desc'): T[] {
    const sorted = dataList.sort(function (a, b) {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

    return sortBy === 'desc' ? sorted.reverse() : sorted;
}

/**
 * 마일스톤 / 업무 / 크루 status badge color 생성
 * @param text
 */
export function getStatusBadgeColor(text: StatusCode) {
    switch (text) {
        case '시작전':
            return {bgColor: 'bg-grey900', textColor: 'text-grey000'};
        case '진행중':
            return {bgColor: 'bg-[#FFF9CF]', textColor: 'text-[#7B5C03]'};
        case '완료':
            return {bgColor: 'bg-[#F1F1F1]', textColor: 'text-[#242D35]'};
        case '만료':
            return {bgColor: 'bg-danger', textColor: 'text-white'};
        case '참여중':
            return {bgColor: 'bg-primary', textColor: 'text-white'};
        case '탈퇴 진행중':
            return {bgColor: 'bg-danger', textColor: 'text-white'};
        case 'PAS1002':
            return {bgColor: 'bg-green-50 ring-green-600/20', textColor: 'text-green-700'}
        case 'PAS1003':
            return {bgColor: 'bg-yellow-50 ring-yellow-600/20', textColor: 'text-yellow-800'}
        case 'PAS1001':
            return {bgColor: 'bg-gray-50 ring-gray-500/10', textColor: 'text-gray-600'}
        default:
            throw Error("Unknown Status Type");
    }
}


export function getRefreshToken(setCookieHeader: string) {
    let refreshTokenValue = "";
    let cookieOptions = {};
    setCookieHeader.split(";").map((item) => {
        const cookieItem = item.trim().split("=");
        if (cookieItem.includes("Refresh")) {
            refreshTokenValue = cookieItem[1];
        } else {
            const optionName = camelCase(cookieItem[0]);
            const optionValue = cookieItem[1] ?? true;
            cookieOptions = {
                ...cookieOptions,
                [optionName]: optionValue,
            };
        }
    });

    return {token: refreshTokenValue, options: cookieOptions};
}

/**
 * 프로젝트 업무 만료여부 검사
 * @param endDate
 */
export function checkExpiration(endDate: string) {
    return new Date(endDate).getTime() < new Date().getTime()
}

/**
 * bigint 데이터 string으로 변환
 * @param data
 */
export function bigIntToString(data: bigint | string) {
    return typeof data === "string" ? data : Number(data).toString();
}

/**
 * 숫자문자열 bigint로 변환
 * @param data
 */
export function numStrToBigInt(data: string) {
    return BigInt(data);
}

export function throwErrorIfInvalid(flag: boolean, message: string) {
    if (flag) throw Error(message);
}

export function changeImageUrl(imgSrc: string | null = null) {
    const imgUrl = imgSrc
        ? imgSrc.replace("projectmatch-user-image.s3.ap-northeast-2.amazonaws.com"
            , "projectmatch-bucket.s3.ap-northeast-2.amazonaws.com")
        : imgSrc;

    return imgUrl;
}

export function makeButtonSize(size: ButtonSize) {
    let textSize;
    let px;
    let py;

    switch (size) {
        case "sm":
            textSize = "mobile:text-xs tablet:text-sm";
            px = "mobile:px-2.5 tablet:px-3";
            py = "mobile:py-1 tablet:py-1";
            break;
        case "md":
            textSize = "mobile:text-sm tablet:text-base";
            px = "mobile:px-3 tablet:px-3.5";
            py = "mobile:py-1 tablet:py-1.5";
            break;
        case "lg":
            textSize = "mobile:text-lg tablet:text-xl";
            px = "mobile:px-3.5 tablet:px-5";
            py = "mobile:py-1.5 tablet:py-2";
            break;
        case "xl":
            textSize = "mobile:text-lg tablet:text-xl";
            px = "mobile:px-4 tablet:px-6";
            py = "mobile:py-2 tablet:py-3";
            break;
        default:
            textSize = "text-sm";
            px = "mobile:px-2.5 tablet:px-3.5";
            py = "mobile:py-1 tablet:py-1.5";
    }

    return {textSize, px, py};
}

export function makeButtonColor(theme: ButtonTheme) {
    let bgColor = "";
    let textColor = "";
    let ring = "";

    switch (theme) {
        case "primary":
            bgColor = "bg-primary";
            textColor = "text-white";
            break;
        case "primary-hollow":
            bgColor = "bg-white";
            textColor = "text-primary";
            ring = "ring-1 ring-inset ring-primary";
            break;
        case "cancel":
            bgColor = "bg-grey200";
            textColor = "text-black100";
            break;
        case "black":
            bgColor = "bg-black";
            textColor = "text-white";
            break;
        case "black-hollow":
            bgColor = "bg-white";
            textColor = "text-black100";
            ring = "ring-1 ring-inset ring-black100";
            break;
        case "disabled":
            bgColor = "bg-grey500";
            textColor = "text-white";
            break;
        case "disabled-hollow":
            bgColor = "bg-white";
            textColor = "text-grey500";
            ring = "ring-1 ring-inset ring-grey500";
            break;
        case "danger":
            bgColor = "bg-danger";
            textColor = "text-white";
            break;
        default:
            bgColor = "bg-primary";
            textColor = "text-white";
    }

    return {bgColor, textColor, ring};
}