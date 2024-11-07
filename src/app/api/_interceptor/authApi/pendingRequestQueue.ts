export type PendingRequest = (error: Error | null) => Promise<void>;

// 사용자별 요청 대기 큐 - key(사용자 아이디)-value(요청대기 큐) Map
export const pendingRequests: Map<string, PendingRequest[]> = new Map<string, PendingRequest[]>();

// 사용자의 요청 대기 큐에 요청 추가
export const addToPendingRequest = (userId: string, request: PendingRequest) => {
    const queue = pendingRequests.get(userId);
    if (queue === undefined) {
        pendingRequests.set(userId, [request]);
    } else {
        queue.push(request);
    }
}

// 사용자의 요청 대기 큐 삭제
export const deleteFromPendingRequest = (userId: string) => {
    pendingRequests.delete(userId);
}

// 사용자의 요청 대기 큐 수행
export const processPendingRequest = (userId: string, error: Error | null) => {
    const queue = pendingRequests.get(userId);
    if (queue) {
        queue.forEach((callback) => callback(error));
        deleteFromPendingRequest(userId);
    }
}