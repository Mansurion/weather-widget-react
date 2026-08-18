import { useEffect, useRef } from 'react';

/**
 * Кастомный хук для отслеживания пересечения элемента с областью видимости.
 * @param {Function} onIntersect - Колбэк, вызываемый при появлении элемента на экране
 * @param {boolean} canTrigger - Условие, при котором разрешено срабатывание (например, !isLoading && hasMore)
 */
export const useIntersectionObserver = (onIntersect, canTrigger) => {
    const targetRef = useRef(null);

    useEffect(() => {
        const targetNode = targetRef.current;
        if (!canTrigger || !targetNode) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                onIntersect();
            }
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0
        });

        observer.observe(targetNode);

        return () => {
            observer.disconnect();
        };
    }, [onIntersect, canTrigger]);

    return targetRef;
};
