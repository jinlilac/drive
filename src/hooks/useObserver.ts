import { useState, useCallback, useEffect } from 'react';

export function useObserver<T extends HTMLElement>() {
  const [isShow, setIsShow] = useState(false);
  const [element, setElement] = useState<T | null>(null);

  // 요소가 마운트될 때마다 호출되는 콜백
  const refCallback = useCallback((node: T | null) => {
    if (node) setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => setIsShow(entry.isIntersecting), {
      rootMargin: '32px',
      threshold: 0.1,
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [element]); // 요소가 변경될 때마다 effect 재실행

  return { ref: refCallback, isShow };
}
