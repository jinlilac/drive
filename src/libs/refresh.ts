export const RefreshManager = {
  currentPromise: null as Promise<void> | null, // 현재 Promise를 저장

  // Promise 실행
  async execute(refreshTokenFn: () => Promise<void>): Promise<void> {
    if (!this.currentPromise) {
      this.currentPromise = refreshTokenFn().finally(() => {
        this.currentPromise = null; // 작업 완료 후 초기화
      });
    }
    return this.currentPromise;
  },
};
