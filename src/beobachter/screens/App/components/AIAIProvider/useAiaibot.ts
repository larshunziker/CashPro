import { useCallback, useRef } from 'react';

export function useAiaibot() {
  const aiaibotRef = useRef<typeof window.aiaibot | null>(null);

  const getAiaibot = useCallback(() => {
    if (aiaibotRef.current !== null) {
      return aiaibotRef.current;
    }
    const value = window.aiaibot ?? null;
    if (value !== null) {
      aiaibotRef.current = value;
    }
    return value;
  }, []);

  return { getAiaibot };
}
