export function debounce<T extends (...args: any[]) => unknown>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const wrapped = function(this: unknown, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, ms);
  } as unknown as T;
  return wrapped;
}

