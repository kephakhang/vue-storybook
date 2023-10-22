type ThrottleFunc<TArgs extends unknown[], TResult> = (
  ...args: TArgs
) => Promise<TResult>;

export function throttle<TArgs extends unknown[], TResult>(
  fn: ThrottleFunc<TArgs, TResult>,
  wait: number
): ThrottleFunc<TArgs, TResult> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastExecutedTime = 0;

  return (...args) => {
    const currentTime = Date.now();

    const execute = async () => {
      lastExecutedTime = Date.now();
      timeoutId = null;
      return await fn(...args);
    };

    if (currentTime - lastExecutedTime > wait) {
      return execute();
    }

    return new Promise((res) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(async () => {
        res(await execute());
      }, wait - (currentTime - lastExecutedTime));
    });
  };
}
