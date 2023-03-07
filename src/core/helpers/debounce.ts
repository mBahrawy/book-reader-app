type TimeoutHandle = ReturnType<typeof setTimeout>;

export function debounce<T extends (...args: unknown[]) => void>(callback: T, delay: number): (...args: Parameters<T>) => void {
    let timer: TimeoutHandle | null;
    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    };
}
