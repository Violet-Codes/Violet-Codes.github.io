import React, { CSSProperties, ReactNode, useCallback, useEffect, useRef, useState } from "react";

export type SemiRegular = {
    style?: CSSProperties;
    className?: string;
};

export type Regular = SemiRegular & {
    children?: ReactNode | ReactNode[];
};

export const normChildren = (children: undefined | ReactNode | ReactNode[]): ReactNode[] =>
    (children !== undefined) ? [children].flat() : [];

export const normStyle = (style: undefined | CSSProperties): CSSProperties =>
    (style !== undefined) ? style : {} as CSSProperties;

export const normClassName = (className: undefined | string): string =>
    (className !== undefined) ? className : "";

// time-travel

export function useCycle(): [number, () => void] {
    const cycle = useRef<number>(0);
    useEffect(() => { cycle.current += 1; });
    const [_, setState] = useState({});
    const doCycle = () => setState({});
    return [cycle.current, doCycle];
}

export function useRefState<S>(initialState: S | (() => S)): [S, React.Dispatch<React.SetStateAction<S>>, () => S] {
    const [state, setState] = useState<S>(initialState);
    const fresh = useRef<S | undefined>(undefined);
    useEffect(() => { fresh.current = state; }, [state]);
    const getState = () => fresh.current as S;
    return [state, setState, getState];
}

export function useFuture<A, B>(): [undefined | ((b: B) => A), (a: A) => Promise<B>] {
    const [respond, setRespond] = useState<undefined | ((b: B) => A)>(undefined);
    const message = (a: A) => new Promise<B>(res =>
        setRespond((_: undefined | ((b: B) => A)) =>
            (b: B) => {
                setRespond(undefined);
                res(b);
                return a;
            }
        )
    );
    return [respond, message];
}

export function useQueueFuture<A, B>(): [undefined | ((b: B) => A), (a: A) => Promise<B>] {
    const queue = useRef<((b: B) => A)[]>([]);
    const [respond, setRespond] = useState<undefined | ((b: B) => A)>(undefined);
    function updateRespond() {
        if (queue) {
            setRespond((_: undefined | ((b: B) => A)) =>
                (b: B) => {
                    const r = queue.current.pop() as (b: B) => A;
                    updateRespond();
                    return r(b);
                }
            );
        } else {
            setRespond(undefined);
        }
    }
    const message = (a: A) => new Promise<B>(res => {
        queue.current = [
            (b: B) => {
                res(b);
                return a;
            },
            ...queue.current
        ];
        updateRespond();
    });
    return [respond, message];
}

export function useMutualFuture<A, B>(): [(b: B) => Promise<A>, (a: A) => Promise<B>] {
    const messageQueue = useRef<[A, (b: B | PromiseLike<B>) => void][]>([]);
    const responseQueue = useRef<[B, (a: A | PromiseLike<A>) => void][]>([]);
    function tryPair() {
        if (messageQueue && responseQueue) {
            const [a, resB] = messageQueue.current.pop() as [A, (b: B | PromiseLike<B>) => void];
            const [b, resA] = responseQueue.current.pop() as [B, (a: A | PromiseLike<A>) => void];
            resB(b);
            resA(a);
        }
    }
    const message = (a: A) => new Promise<B>(res => {
        messageQueue.current = [[a, res], ...messageQueue.current];
        tryPair();
    });
    const respond = (b: B) => new Promise<A>(res => {
        responseQueue.current = [[b, res], ...responseQueue.current];
        tryPair();
    });
    return [respond, message];
}

export function makeMutual<A, B>(): [(b: B) => Promise<A>, (a: A) => Promise<B>] {
    var messageQueue: [A, (b: B | PromiseLike<B>) => void][] = [];
    var responseQueue: [B, (a: A | PromiseLike<A>) => void][] = [];
    function tryPair() {
        if (messageQueue && responseQueue) {
            const [a, resB] = messageQueue.pop() as [A, (b: B | PromiseLike<B>) => void];
            const [b, resA] = responseQueue.pop() as [B, (a: A | PromiseLike<A>) => void];
            resB(b);
            resA(a);
        }
    }
    const message = (a: A) => new Promise<B>(res => {
        messageQueue = [[a, res], ...messageQueue];
        tryPair();
    });
    const respond = (b: B) => new Promise<A>(res => {
        responseQueue = [[b, res], ...responseQueue];
        tryPair();
    });
    return [respond, message];
}