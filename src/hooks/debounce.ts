import { useEffect, useState } from 'react';

type UseDebounceReturnType<T> = [
    value: T,
    setValue: React.Dispatch<React.SetStateAction<T>>
];

const useDebounce = <T>(value: T, delay: number): UseDebounceReturnType<T> => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return [debouncedValue, setDebouncedValue];
};

export default useDebounce;