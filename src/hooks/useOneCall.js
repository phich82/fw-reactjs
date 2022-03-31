import { useRef, useEffect } from 'react';

export const useOnceCall = (callback, conditon = true) => {
  const isCalledRef = useRef(false);
  useEffect(() => {
    if (conditon && !isCalledRef.current) {
      isCalledRef.current = true;
      callback();
    }
  }, [callback, conditon]);
};
