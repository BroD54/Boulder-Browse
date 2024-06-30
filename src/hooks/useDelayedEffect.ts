import { useEffect, EffectCallback, useState } from 'react';

const useDelayedEffect = (effect: EffectCallback, deps: any[] = []) => {
  const [isMount, setIsMount] = useState(true)

  useEffect(() => {
    if (isMount) {
      setIsMount(false)
    } else {
      effect();
    }
  }, deps);
};

export default useDelayedEffect;
