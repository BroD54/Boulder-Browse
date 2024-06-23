import { useEffect, EffectCallback, useRef } from 'react';

const useDelayedEffect = (effect: EffectCallback, deps: any[] = []) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    }
  }, deps);
};

export default useDelayedEffect;
