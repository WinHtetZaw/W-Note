type AnyFunction = (...args: any[]) => void;

export type DebouncedFunction<T extends AnyFunction> = ((
  ...args: Parameters<T>
) => void) & {
  cancel: () => void;
  flush: () => void;
};

export function debounce<T extends AnyFunction>(
  fn: T,
  delay = 300,
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: Parameters<T> | undefined;

  const debounced = ((...args: Parameters<T>) => {
    lastArgs = args;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId = undefined;

      if (!lastArgs) return;

      fn(...lastArgs);
      lastArgs = undefined;
    }, delay);
  }) as DebouncedFunction<T>;

  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }

    lastArgs = undefined;
  };

  debounced.flush = () => {
    if (!lastArgs) return;

    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }

    fn(...lastArgs);
    lastArgs = undefined;
  };

  return debounced;
}
