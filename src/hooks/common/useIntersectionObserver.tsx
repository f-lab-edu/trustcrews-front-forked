'use client';

import {MutableRefObject, useEffect} from "react";
import {useRecoilState} from "recoil";
import {userNoticeModalStateStore} from "@/store/UserNoticeModalStateStore";

interface IntersectObserverProps {
    target: MutableRefObject<HTMLElement | null>
    root: MutableRefObject<Document | HTMLUListElement | null>
    onIntersectHandler: IntersectionObserverCallback
    rootMargin?: string
    threshold?: number
}

export default function useIntersectionObserver(
    {
        target, // 감지할 대상
        root, // 교차할 부모 요소
        onIntersectHandler, // target 감지시 실행할 callback 함수. entries: IntersectionObserverEntry[], observer: IntersectionObserver
        rootMargin = '0px', // root와 target이 감지하는 여백의 거리
        threshold = 1.0, // 임계점으로, 1.0이면 root내에서 target이 100% 보여질 때 callback이 실행디ㅗㄴ다.
    }: IntersectObserverProps) {

    useEffect(() => {
        let observer: IntersectionObserver;
        if ((target && target.current) && (root && root.current)) {
            observer = new IntersectionObserver(onIntersectHandler, {
                root: root.current, rootMargin, threshold
            });

            observer.observe(target.current);
        }

    }, [root, onIntersectHandler, target, rootMargin, threshold])

}