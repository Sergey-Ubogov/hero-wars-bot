export const AsyncHelper = {
    delay(ms: number) {
        return new Promise((res) => {
            setTimeout(res, ms);
        });
    },
};
