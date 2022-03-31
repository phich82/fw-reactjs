import { useState, useCallback } from 'react';

export const useForceUpdate = () => {
  const [, setStick] = useState(0);
  const update = useCallback(() => {
    setStick(tick => tick + 1);
  }, []);
  return update;
};
