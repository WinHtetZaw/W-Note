type AnyFunction = (...args: any[]) => void;

export type ThrottledFunction<T extends AnyFunction> = ((
  ...args: Parameters<T>
) => void) & {
  cancel: () => void;
};

export function throttle<T extends AnyFunction>(
  fn: T,
  interval = 100,
): ThrottledFunction<T> {
  let lastExecution = 0;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: Parameters<T> | undefined;

  const throttled = ((...args: Parameters<T>) => {
    const now = Date.now();
    const remaining = interval - (now - lastExecution);

    lastArgs = args;

    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }

      lastExecution = now;

      fn(...args);
      lastArgs = undefined;

      return;
    }

    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        timeoutId = undefined;
        lastExecution = Date.now();

        if (!lastArgs) return;

        fn(...lastArgs);
        lastArgs = undefined;
      }, remaining);
    }
  }) as ThrottledFunction<T>;

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }

    lastArgs = undefined;
    lastExecution = 0;
  };

  return throttled;
}
